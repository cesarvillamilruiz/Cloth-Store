import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionFontComponent } from './option-font.component';

describe('OptionFontComponent', () => {
  let component: OptionFontComponent;
  let fixture: ComponentFixture<OptionFontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OptionFontComponent]
    });
    fixture = TestBed.createComponent(OptionFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
