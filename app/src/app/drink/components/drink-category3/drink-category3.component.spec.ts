/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DrinkCategory3Component } from './drink-category3.component';

describe('DrinkCategory3Component', () => {
  let component: DrinkCategory3Component;
  let fixture: ComponentFixture<DrinkCategory3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinkCategory3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinkCategory3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
