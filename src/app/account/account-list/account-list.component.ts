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

import { AccountService } from '../../services/account.service';
import type {
    RxAccountDocument
} from '../../RxDB.d';
@Component({
  selector: 'account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.less'],
  providers: [AccountService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountListComponent {

  public emittedFirst = false;
  public accounts$: Observable<RxAccountDocument[]>;
  @Output('edit') editChange: EventEmitter<RxAccountDocument> = new EventEmitter();

  constructor(
      private dbService: AccountService
  ) {
      this.accounts$ = this.dbService
          .db.account                // collection
          .find({                 // query
              selector: {},
              sort: [{ name: 'asc' }]
          })
          .$.pipe(                // observable
              tap(() => this.emittedFirst = true)          // hide loading-icon on first emit
          );
        }

  set edit(account: RxAccountDocument) {
      console.log('editAccount: ' + account.name);
      this.editChange.emit(account);
  }
  editAccount(account: RxAccountDocument) {
      this.edit = account;
  }
  deleteAccount(account: RxAccountDocument) {
    account.remove();
  }


}
