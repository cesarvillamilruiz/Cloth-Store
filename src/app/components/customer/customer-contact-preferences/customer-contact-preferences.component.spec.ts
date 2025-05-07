import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContactPreferencesComponent } from './customer-contact-preferences.component';

describe('CustomerContactPreferencesComponent', () => {
  let component: CustomerContactPreferencesComponent;
  let fixture: ComponentFixture<CustomerContactPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerContactPreferencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContactPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
