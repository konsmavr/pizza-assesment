import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaMenuComponent } from './pizza-menu.component';

describe('PizzaMenuComponent', () => {
  let component: PizzaMenuComponent;
  let fixture: ComponentFixture<PizzaMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzaMenuComponent]
    });
    fixture = TestBed.createComponent(PizzaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
