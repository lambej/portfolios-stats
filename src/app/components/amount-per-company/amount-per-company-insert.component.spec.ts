import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountPerCompanyComponent } from './amount-per-company.component';

describe('AmountPerCompanyComponent', () => {
  let component: AmountPerCompanyComponent;
  let fixture: ComponentFixture<AmountPerCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountPerCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountPerCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
