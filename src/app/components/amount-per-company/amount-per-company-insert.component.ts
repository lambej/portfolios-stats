import { Component, ViewChild,
  ChangeDetectionStrategy } from '@angular/core';
import { AmountPerCompanyService } from '../../services/amount-per-company.service';
import { AccountService } from '../../services/account.service';
import {
  Observable,
} from 'rxjs';
import {
  tap
} from 'rxjs/operators';
import type {
  RxAmountPerCompanyDocument,
  RxAccountDocument
} from '../../RxDB.d';
interface Currency {
  value: string;
}
@Component({
  selector: 'amount-per-company-insert',
  templateUrl: './amount-per-company-insert.component.html',
  styleUrls: ['./amount-per-company-insert.component.less'],
  providers: [AmountPerCompanyService,AccountService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmountPerCompanyComponent {
  @ViewChild('input', { static: false }) inputfield: any;
  public emittedFirst = false;
  public dateValue = new Date();
  public accounts$: Observable<RxAccountDocument[]>;
  currencies: Currency[] = [
    {value: 'USD'},
    {value: 'CAD'},
  ];
  AmountPerCompany: any;
  constructor(private AmountPerCompanyDBService: AmountPerCompanyService, private dbService: AccountService) {
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
    this.AmountPerCompany = this.AmountPerCompanyDBService.db.amountpercompany.newDocument({


    });
  } 
  async submit() {
    this.AmountPerCompany.date = this.convertUTCDateToLocalDate(new Date(this.dateValue)).getTime();
    try {
        await this.AmountPerCompany.save();
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
