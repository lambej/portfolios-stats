import { Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy} from '@angular/core';
  import {
    Observable,
} from 'rxjs';
import {
    tap
} from 'rxjs/operators';

import { AmountPerCompanyService } from '../../services/amount-per-company.service';
import type {
    RxAmountPerCompanyDocument
} from '../../RxDB.d';
@Component({
  selector: 'amount-per-company-list',
  templateUrl: './amount-per-company-list.component.html',
  styleUrls: ['./amount-per-company-list.component.less'],
  providers: [AmountPerCompanyService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmountPerCompanyListComponent {
  public emittedFirst = false;
  public amountpercompany$: Observable<RxAmountPerCompanyDocument[]>;
  @Output('edit') editChange: EventEmitter<RxAmountPerCompanyDocument> = new EventEmitter();
  constructor(
      private dbService: AmountPerCompanyService
  ) {
      this.amountpercompany$ = this.dbService
          .db.amountpercompany                // collection
          .find({                 // query
              selector: {},
              sort: [{ date: 'desc' }]
          })
          .$.pipe(                // observable
              tap(() => this.emittedFirst = true)          // hide loading-icon on first emit
          );
        }
        
  set edit(amountpercompany: RxAmountPerCompanyDocument) {
      console.log('editCotisation: ' + amountpercompany.symbol);
      this.editChange.emit(amountpercompany);
  }
  editAmountPerCompany(amountpercompany: RxAmountPerCompanyDocument) {
      this.edit = amountpercompany;
  }
  deleteAmountPerCompany(amountpercompany: RxAmountPerCompanyDocument) {
    amountpercompany.remove();
  }
}
