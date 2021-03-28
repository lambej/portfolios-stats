import { Component, ViewChild,
  ChangeDetectionStrategy } from '@angular/core';
import { CotisationService } from '../../../services/cotisation.service';
import { AccountService } from '../../../services/account.service';
import {
  Observable,
} from 'rxjs';
import {
  tap
} from 'rxjs/operators';
import type {
  RxAccountDocument
} from '../../../RxDB.d';
@Component({
  selector: 'cotisation-insert',
  templateUrl: './cotisation-insert.component.html',
  styleUrls: ['./cotisation-insert.component.less'],
  providers: [CotisationService,AccountService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CotisationInsertComponent {
  @ViewChild('input', { static: false }) inputfield: any;
  public emittedFirst = false;
  public accounts$: Observable<RxAccountDocument[]>;
  public dateValue = new Date();
  Cotisation: any;
  constructor(private dbCService: CotisationService, private dbService: AccountService) {
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
            this.Cotisation = this.dbCService.db.cotisation.newDocument({
        
        
            });
          } 
          async submit() {
            this.Cotisation.date = this.convertUTCDateToLocalDate(new Date(this.dateValue)).getTime();
            try {
                await this.Cotisation.save();
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
