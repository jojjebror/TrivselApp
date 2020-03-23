/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DrinkCategory2Component } from './drink-category2.component';

describe('DrinkCategory2Component', () => {
  let component: DrinkCategory2Component;
  let fixture: ComponentFixture<DrinkCategory2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkCategory2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkCategory2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
