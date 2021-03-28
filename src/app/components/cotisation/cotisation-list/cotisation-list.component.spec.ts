import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotisationListComponent } from './cotisation-list.component';

describe('CotisationListComponent', () => {
  let component: CotisationListComponent;
  let fixture: ComponentFixture<CotisationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotisationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotisationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
