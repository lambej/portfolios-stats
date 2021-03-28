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

import { AmountPerAccountService } from '../../services/amount-per-account.service';
import type {
    RxAmountPerAccountDocument
} from '../../RxDB.d';
@Component({
  selector: 'amount-per-account-list',
  templateUrl: './amount-per-account-list.component.html',
  styleUrls: ['./amount-per-account-list.component.less'],
  providers: [AmountPerAccountService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmountPerAccountListComponent {
  public emittedFirst = false;
  public amountperaccount$: Observable<RxAmountPerAccountDocument[]>;
  @Output('edit') editChange: EventEmitter<RxAmountPerAccountDocument> = new EventEmitter();
  constructor(
      private dbService: AmountPerAccountService
  ) {
      this.amountperaccount$ = this.dbService
          .db.amountperaccount                // collection
          .find({                 // query
              selector: {},
              sort: [{ date: 'desc' }]
          })
          .$.pipe(                // observable
              tap(() => this.emittedFirst = true)          // hide loading-icon on first emit
          );
        }
        
  set edit(amountperaccount: RxAmountPerAccountDocument) {
      console.log('editCotisation: ' + amountperaccount.account);
      this.editChange.emit(amountperaccount);
  }
  editAmountPerAccount(amountperaccount: RxAmountPerAccountDocument) {
      this.edit = amountperaccount;
  }
  deleteAmountPerAccount(amountperaccount: RxAmountPerAccountDocument) {
    amountperaccount.remove();
  }
}
