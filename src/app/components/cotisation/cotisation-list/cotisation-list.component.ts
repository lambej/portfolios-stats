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

import { CotisationService } from '../../../services/cotisation.service';
import type {
    RxCotisationDocument
} from '../../../RxDB.d';
@Component({
  selector: 'cotisation-list',
  templateUrl: './cotisation-list.component.html',
  styleUrls: ['./cotisation-list.component.less'],
  providers: [CotisationService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CotisationListComponent {

  public emittedFirst = false;
  public cotisations$: Observable<RxCotisationDocument[]>;
  @Output('edit') editChange: EventEmitter<RxCotisationDocument> = new EventEmitter();
  constructor(
      private dbService: CotisationService
  ) {
      this.cotisations$ = this.dbService
          .db.cotisation                // collection
          .find({                 // query
              selector: {},
              sort: [{ account: 'asc' },{ date: 'desc' }]
          })
          .$.pipe(                // observable
              tap(() => this.emittedFirst = true)          // hide loading-icon on first emit
          );
        }
        
  set edit(cotisation: RxCotisationDocument) {
      console.log('editCotisation: ' + cotisation.account);
      this.editChange.emit(cotisation);
  }
  editCotisation(cotisation: RxCotisationDocument) {
      this.edit = cotisation;
  }
  deleteCotisation(cotisation: RxCotisationDocument) {
    cotisation.remove();
  }


}
