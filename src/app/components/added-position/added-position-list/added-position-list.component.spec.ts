import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedPositionListComponent } from './added-position-list.component';

describe('AddedPositionListComponent', () => {
  let component: AddedPositionListComponent;
  let fixture: ComponentFixture<AddedPositionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedPositionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedPositionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
