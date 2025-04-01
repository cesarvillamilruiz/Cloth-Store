import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionClipartComponent } from './option-clipart.component';

describe('OptionClipartComponent', () => {
  let component: OptionClipartComponent;
  let fixture: ComponentFixture<OptionClipartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionClipartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionClipartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
