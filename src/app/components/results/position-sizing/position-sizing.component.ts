import { Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy, OnInit, OnDestroy,
  ChangeDetectorRef,} from '@angular/core';
  import * as _ from 'lodash';
  import {
    Observable,
    from,
    async,
    GroupedObservable,
    forkJoin
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../../../models/quote';
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

import { AmountPerCompanyService } from '../../../services/amount-per-company.service';
import { AmountPerAccountService } from '../../../services/amount-per-account.service';
import type {
    RxAmountPerCompanyDocument, RxAmountPerCompanyDocumentType,
    RxAmountPerAccountDocument, RxAmountPerAccountDocumentType
} from '../../../RxDB.d';
import { map } from 'rxjs/operators';
import { AddedPositionService } from 'src/app/services/added-position.service';
import { TickerService } from 'src/app/services/ticker.service';
const PortfolioLookupInterval : number = 10000; // 10 seconds.
 interface Quotes {
  symbol: string;
  amount: number;
};
@Component({
  selector: 'position-sizing',
  templateUrl: './position-sizing.component.html',
  styleUrls: ['./position-sizing.component.less'],
  providers: [AmountPerCompanyService, AmountPerAccountService,TickerService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionSizingComponent implements OnInit, OnDestroy {
  public addedPosition$;
  public amountPerAccount$;
  portfolioIntervalHandle : any;
  public groupedData: any = [];
  public intervalCount = 0;
  public quotetest:Quote[] = [];
  public totalAmount:any;
  public timeFilter = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000 + new Date().getTimezoneOffset()*60*1000);
  constructor(private cd: ChangeDetectorRef, private dbService: AddedPositionService, private dbAmountPerAccountService: AmountPerAccountService,private tickerService : TickerService) { 

    this.amountPerAccount$ = this.dbAmountPerAccountService
    .db.amountperaccount // collection
    .find({
      selector: { date: { $gt: this.timeFilter.getTime() } },
      sort: [{ date: 'desc' }],
    });

  this.addedPosition$ = this.dbService
    .db.addedposition // collection
    .find({
      selector: {},
      sort: [{ symbol: 'desc' }],
    });
  } 
  trackById(index: number, qu: Quote) {
    return qu.symbol
  }
  private init() {


      this.amountPerAccount$.$.pipe(map(doc => {
       this.totalAmount =  _.chain(doc).groupBy('date').map((value, key) => ({
           amount: _.sumBy(value,'amount'),
           date: value[0].date
       })).orderBy('date', 'desc').first().value().amount;  
     }),mergeMap( d=> this.addedPosition$.$.map((doc: any) => {
      const key = _.chain(doc).groupBy('symbol').map((value, key) => ({symbol :value[0].symbol, qty:value[0].quantity_of_shares})).value();

       key.forEach(element => {
        if(this.quotetest.find((qu) => qu.symbol == element.symbol) == undefined)
          this.quotetest = [...this.quotetest, new Quote(element.symbol,element.qty, element.qty/this.totalAmount )];
          this.cd.markForCheck();
      });
    }))).subscribe(a => a);
    this.lookupStockSymbols();
  }

  ngOnInit() {

    this.init();

    // Periodically get new quotes for the stock symbols.
    this.portfolioIntervalHandle = setInterval( interval => {      
      this.lookupStockSymbols();
    }, 
    PortfolioLookupInterval);
  }

  ngOnDestroy() {
      clearInterval(this.portfolioIntervalHandle);
  }

  private lookupStockSymbols() {
    const symbol = this.quotetest.map((q:any) => {return q.symbol});
    symbol.forEach((value:any) => {
      this.tickerService.getQuote(value).subscribe(
        newQuote => {
          let oldQuote = this.quotetest.find((qu:any) => qu.symbol == value);
          
          if (typeof oldQuote != 'undefined') {
         //   value.change = newQuote.change;
            oldQuote.price *= newQuote.price;
            oldQuote.percent *= newQuote.price*100;
            let index = this.quotetest.indexOf(oldQuote);
            this.quotetest[index] = oldQuote;
            this.quotetest = [...this.quotetest];
            this.cd.markForCheck();
            if(this.intervalCount = 1)
              clearInterval(this.portfolioIntervalHandle);

            this.intervalCount++;
          }
        }
      );
    });
  }
}