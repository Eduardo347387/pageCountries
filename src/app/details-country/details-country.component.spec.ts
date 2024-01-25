import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCountryComponent } from './details-country.component';

describe('DetailsCountryComponent', () => {
  let component: DetailsCountryComponent;
  let fixture: ComponentFixture<DetailsCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsCountryComponent]
    });
    fixture = TestBed.createComponent(DetailsCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
