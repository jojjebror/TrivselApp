import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinkPayCreditComponent } from './drink-pay-credit.component';

describe('DrinkPayCreditComponent', () => {
  let component: DrinkPayCreditComponent;
  let fixture: ComponentFixture<DrinkPayCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkPayCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkPayCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
