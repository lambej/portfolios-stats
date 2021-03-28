import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountPerCompanyListComponent } from './amount-per-company-list.component';

describe('AmountPerCompanyListComponent', () => {
  let component: AmountPerCompanyListComponent;
  let fixture: ComponentFixture<AmountPerCompanyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountPerCompanyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountPerCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
