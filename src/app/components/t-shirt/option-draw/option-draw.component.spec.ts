import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionDrawComponent } from './option-draw.component';

describe('OptionDrawComponent', () => {
  let component: OptionDrawComponent;
  let fixture: ComponentFixture<OptionDrawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OptionDrawComponent]
    });
    fixture = TestBed.createComponent(OptionDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
