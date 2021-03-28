import { Component } from '@angular/core';
import { AmountPerAccountService } from '../../../services/amount-per-account.service';
import { RxAmountPerAccountDocument } from '../../../RxDB.d';

import {
  Observable,
} from 'rxjs';
@Component({
  selector: 'result-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.less']
})
export class WeeklyComponent {
  public amountperaccount$;
  public return = 0;
  public firstAmountPerAccount:any;
  public lastAmountPerAccount:any;
  public timeFilter = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000 + new Date().getTimezoneOffset()*60*1000);
  constructor(private dbService: AmountPerAccountService) { 
    this.amountperaccount$ = this.dbService
          .db.amountperaccount                // collection
          .find({                 // query
              selector: { date: { $gt: this.timeFilter.getTime() } },
              sort: [{ date: 'asc' }],
              
          });
          this.calculateLast7DaysReturn(8);
          
           
  }
  calculateLast7DaysReturn(period:number) {
    var date = new Date();
    date.setHours(0,0,0,0);
    var dayOfWeek = date.getDay();
    if (period == 8)
    { 
      if (dayOfWeek == 6)
        period += 1;
      if (dayOfWeek == 0)
        period += 2;
    }
    this.timeFilter = new Date(date.getTime() - period * 24 * 60 * 60 * 1000);
    this.timeFilter 
    this.amountperaccount$ = this.dbService
          .db.amountperaccount                // collection
          .find({                 // query
              selector: { date: { $gt: this.timeFilter.getTime() } },
              sort: [{ date: 'asc' }],
              
          });
    this.amountperaccount$.exec().then(doc => { 
      this.firstAmountPerAccount = doc[0]
      this.lastAmountPerAccount = doc[doc.length - 1];
      this.return = this.calculateReturn(doc);
    });
  }
  private convertUTCDateToLocalDate(date:Date) : Date {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset()*60*1000);
    return newDate;   
  }

  private calculateReturn(docs:RxAmountPerAccountDocument[]) : number {
    this.firstAmountPerAccount = docs[0]
    this.lastAmountPerAccount = docs[docs.length - 1];
    var firstAmount = 0;
    var lastAmount = 0;

    docs.forEach(e => {
      if (e.date == this.firstAmountPerAccount.date)
        firstAmount += e.amount;

      if (e.date == this.lastAmountPerAccount.date)
      lastAmount += e.amount;
    });
    // this.amountperaccount$.sort({date: 'desc'}).exec().then(doc1 => {
    //   this.lastAmountPerAccount = doc1;
    return (lastAmount - firstAmount) / firstAmount * 100;
    // });
  }
}
