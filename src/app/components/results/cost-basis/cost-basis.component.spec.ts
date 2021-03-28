import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostBasisComponent } from './cost-basis.component';

describe('CostBasisComponent', () => {
  let component: CostBasisComponent;
  let fixture: ComponentFixture<CostBasisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostBasisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostBasisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
