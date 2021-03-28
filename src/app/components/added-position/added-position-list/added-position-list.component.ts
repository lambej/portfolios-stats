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
import { AddedPositionService } from '../../../services/added-position.service';
import type {
    RxAddedPositionDocument
} from '../../../RxDB.d';
@Component({
  selector: 'added-position-list',
  templateUrl: './added-position-list.component.html',
  styleUrls: ['./added-position-list.component.less'],
  providers: [AddedPositionService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddedPositionListComponent {
  public emittedFirst = false;
  public addedPosition$: Observable<RxAddedPositionDocument[]>;
  @Output('edit') editChange: EventEmitter<RxAddedPositionDocument> = new EventEmitter();
  constructor(private dbService: AddedPositionService) { 
    this.addedPosition$ = this.dbService
    .db.addedposition                // collection
    .find({                 // query
        selector: {},
        sort: [{ symbol: 'desc' }]
    })
    .$.pipe(                // observable
        tap(() => this.emittedFirst = true)          // hide loading-icon on first emit
    );
  }
  
  set edit(addedPosition: RxAddedPositionDocument) {
    console.log('editAddedPosition: ' + addedPosition.symbol);
    this.editChange.emit(addedPosition);
  }
editAddedPosition(addedPosition: RxAddedPositionDocument) {
    this.edit = addedPosition;
  }
deleteAddedPosition(addedPosition: RxAddedPositionDocument) {
    addedPosition.remove();
  }
}

