import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotisationInsertComponent } from './cotisation-insert.component';

describe('CotisationInsertComponent', () => {
  let component: CotisationInsertComponent;
  let fixture: ComponentFixture<CotisationInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotisationInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotisationInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
