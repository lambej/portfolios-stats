import { Component, ViewChild } from '@angular/core';
import { WeeklyComponent } from './components/results/weekly/weekly.component';
import {
  RxHeroDocument,
  RxAccountDocument,
  RxCotisationDocument,
  RxAmountPerAccountDocument,
  RxAmountPerCompanyDocument,
  RxAddedPositionDocument
} from './RxDB.d';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'portfolios-stats';
  @ViewChild(WeeklyComponent)
  private weeklyComponent?: WeeklyComponent;
  public editedHero?: RxHeroDocument;
  public editedAccount?: RxAccountDocument;
  public editedCotisation?: RxCotisationDocument;
  public editedAmountPerAccount?: RxAmountPerAccountDocument;
  public editedAmountPerCompany?: RxAmountPerCompanyDocument;
  public editedAddedPosition?: RxAddedPositionDocument;
  constructor() { }
  ngOnInit() { }


  /**
   * this method exists to play arround with the typings
   */
  foo() {
    // const x: number = this.editedHero.hpPercent();
  }

  editHero(hero: RxHeroDocument) {
    this.editedHero = hero;
  }
  editAccount(account: RxAccountDocument) {
    this.editedAccount = account;
  }
  editCotisation(cotisation: RxCotisationDocument) {
    this.editedCotisation = cotisation;
  }
  editAmountPerAccount(amountPerAccount: RxAmountPerAccountDocument) {
    this.editedAmountPerAccount = amountPerAccount;
  }
  editAmountPerCompany(amountPerCompany: RxAmountPerCompanyDocument) {
    this.editedAmountPerCompany = amountPerCompany;
  }
  editAddedPosition(addedPosition: RxAddedPositionDocument) {
    this.editedAddedPosition = addedPosition;
  }

  calculateLast7DaysReturn(period:number){
    if (this.weeklyComponent)
      this.weeklyComponent.calculateLast7DaysReturn(period);
  }
  calculateMTDReturn(){
    if (this.weeklyComponent)
    {
      var date = new Date();
      date.setHours(0,0,0,0);
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      firstDay.setHours(0,0,0,0);
      var period:number =  (date.getTime() - firstDay.getTime()) / 24 / 60 / 60 / 1000;
      this.weeklyComponent.calculateLast7DaysReturn(period + 1);
    }
  }

  calculateYTDReturn(){
    if (this.weeklyComponent)
    {
      var date = new Date();
      date.setHours(0,0,0,0);
      var firstDay = new Date(date.getFullYear(), 0, 1);
      firstDay.setHours(0,0,0,0);
      var period:number =  (date.getTime() - firstDay.getTime()) / 24 / 60 / 60 / 1000;
      this.weeklyComponent.calculateLast7DaysReturn(period + 1);
    }
  }
}