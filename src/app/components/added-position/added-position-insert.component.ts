import { Component, ViewChild,
  ChangeDetectionStrategy } from '@angular/core';
import { AddedPositionService } from '../../services/added-position.service';
import {
  Observable,
} from 'rxjs';
import {
  tap
} from 'rxjs/operators';
import type {
  RxAccountDocument
} from '../../RxDB.d';
interface Currency {
  value: string;
}
@Component({
  selector: 'added-position-insert',
  templateUrl: './added-position-insert.component.html',
  styleUrls: ['./added-position-insert.component.less'],
  providers: [AddedPositionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddedPositionComponent {
  @ViewChild('input', { static: false }) inputfield: any;
  public emittedFirst = false;
  public dateValue = new Date();
  AddedPosition: any;
  currencies: Currency[] = [
    {value: 'USD'},
    {value: 'CAD'},
  ];
  constructor(private AddedPositionDBService: AddedPositionService) {
    this.reset();
  }
  reset() {
    this.AddedPosition = this.AddedPositionDBService.db.addedposition.newDocument({


    });
  } 
  async submit() {
    this.AddedPosition.date = this.convertUTCDateToLocalDate(new Date(this.dateValue)).getTime();
    try {
        await this.AddedPosition.save();
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

