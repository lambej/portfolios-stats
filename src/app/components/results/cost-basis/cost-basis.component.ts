import { Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';
  import * as _ from 'lodash';
  import {
    Observable,
    from,
    async,
    GroupedObservable
} from 'rxjs';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toArray';
import {
  flatMap,
  groupBy,
  switchMap,
  mergeMap,
  tap,
} from 'rxjs/operators';

import { AddedPositionService } from '../../../services/added-position.service';
import type {
    RxAddedPositionDocument, RxAddedPositionDocumentType
} from '../../../RxDB.d';
@Component({
  selector: 'cost-basis',
  templateUrl: './cost-basis.component.html',
  styleUrls: ['./cost-basis.component.less'],
  providers: [AddedPositionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CostBasisComponent {
  public addedPosition$;

  public groupedData: any = [];
  
  constructor(private dbService: AddedPositionService) { 
    this.addedPosition$ = this.dbService
    .db.addedposition                // collection
    .find({                 // query
        selector: {},
        sort: [{ symbol: 'desc' }],   
    }); 

    this.groupedData  = this.addedPosition$.$.map(doc => {
      return from(doc)
      .groupBy((a:any) => a.symbol)
      .flatMap((group:any) => group.toArray())// GroupBy dont create a array object so you have to flat it
      .map((g:any) => {// mapping 
        return {
          symbol: g[0].symbol,//take the first name because we grouped them by name
          qty: _.sumBy(g, 'quantity_of_shares'), // using lodash to sum quantity
          price: _.chain(g).map(function(value) {
            return value.unit_price * value.quantity_of_shares;
          }).sum().value() / _.sumBy(g, 'quantity_of_shares'),
          currency: g[0].currency
        }
      })
    }).flatMap((g:any)=> g.toArray());
  }
}