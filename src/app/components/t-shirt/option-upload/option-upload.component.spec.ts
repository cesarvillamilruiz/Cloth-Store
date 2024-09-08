import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionUploadComponent } from './option-upload.component';

describe('OptionUploadComponent', () => {
  let component: OptionUploadComponent;
  let fixture: ComponentFixture<OptionUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OptionUploadComponent]
    });
    fixture = TestBed.createComponent(OptionUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
