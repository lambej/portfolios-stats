import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountPerAccountComponent } from './amount-per-account-insert.component';

describe('AmountPerAccountComponent', () => {
  let component: AmountPerAccountComponent;
  let fixture: ComponentFixture<AmountPerAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmountPerAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountPerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
