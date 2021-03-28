import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedPositionComponent } from './added-position.component';

describe('AddedPositionComponent', () => {
  let component: AddedPositionComponent;
  let fixture: ComponentFixture<AddedPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
