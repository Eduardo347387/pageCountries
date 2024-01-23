import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCountrysComponent } from './list-countrys.component';

describe('ListCountrysComponent', () => {
  let component: ListCountrysComponent;
  let fixture: ComponentFixture<ListCountrysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCountrysComponent]
    });
    fixture = TestBed.createComponent(ListCountrysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
