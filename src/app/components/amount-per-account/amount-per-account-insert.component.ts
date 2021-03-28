import { Component, ViewChild,
  ChangeDetectionStrategy } from '@angular/core';
import { AmountPerAccountService } from '../../services/amount-per-account.service';
import { AccountService } from '../../services/account.service';
import {
  Observable,
} from 'rxjs';
import {
  tap
} from 'rxjs/operators';
import type {
  RxAccountDocument
} from '../../RxDB.d';
@Component({
  selector: 'amount-per-account-insert',
  templateUrl: './amount-per-account-insert.component.html',
  styleUrls: ['./amount-per-account-insert.component.less'],
  providers: [AmountPerAccountService,AccountService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmountPerAccountComponent {
  @ViewChild('input', { static: false }) inputfield: any;
  public emittedFirst = false;
  public accounts$: Observable<RxAccountDocument[]>;
  public dateValue = new Date();
  AmountPerAccount: any;
  constructor(private AmountPerAcountDBService: AmountPerAccountService, private dbService: AccountService) { 
    this.accounts$ = this.dbService
    .db.account                // collection
    .find({                 // query
        selector: {},
        sort: [{ name: 'asc' }]
    })
    .$.pipe(                // observable
        tap(() => this.emittedFirst = true)          // hide loading-icon on first emit
    );
    this.reset();
  }
  reset() {
    this.AmountPerAccount = this.AmountPerAcountDBService.db.amountperaccount.newDocument({


    });
  } 
  async submit() {
    this.AmountPerAccount.date = this.convertUTCDateToLocalDate(new Date(this.dateValue)).getTime();
    try {
        await this.AmountPerAccount.save();
        this.reset();
    } catch (err) {
        alert('Error: Please check console');
        console.error('hero-insert.submit(): error:');
        throw err;
    }

    this.inputfield.nativeElement.focus();
  }

  private convertUTCDateToLocalDate(date:Date) : Date {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset()*60*1000);
    return newDate;   
}

}
