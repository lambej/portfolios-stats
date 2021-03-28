import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountPerAccountListComponent } from './amount-per-account-list.component';

describe('AmountPerAccountListComponent', () => {
  let component: AmountPerAccountListComponent;
  let fixture: ComponentFixture<AmountPerAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountPerAccountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountPerAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
