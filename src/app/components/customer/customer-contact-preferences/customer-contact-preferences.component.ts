import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactPreference } from 'src/app/model/contact-preference/contact-preference.model';
import { ContactPreferencesService } from 'src/app/services/contact-preferences/contact-preferences.service';

@Component({
  selector: 'app-customer-contact-preferences',
  templateUrl: './customer-contact-preferences.component.html',
  styleUrl: './customer-contact-preferences.component.scss'
})
export class CustomerContactPreferencesComponent implements OnInit {

  form: FormGroup;
  contactPreference: ContactPreference = new ContactPreference();

  constructor(private fb: FormBuilder, private contactPreferencesService: ContactPreferencesService) {}

  ngOnInit(): void {
    this.getContactPreference();
  }

  onSubmit() {
    const saveContactPreference = this.form.value as ContactPreference;

    if(!saveContactPreference?.contactPreferenceId ||
      saveContactPreference?.contactPreferenceId === '00000000-0000-0000-0000-000000000000'){
      this.insertContactPreference(saveContactPreference);
    }
    else{
      this.updateContactPreference(saveContactPreference);
    }
  }

  private insertContactPreference(contactPreference: ContactPreference): void{
    this.contactPreferencesService.insertContactPreference(contactPreference).subscribe({
      next: (contactPreference: any) => {
        this.contactPreference = contactPreference;
        this.setForm();
      },
      error: () => {

      },
      complete: () => {

      }
    });
  }

  private updateContactPreference(contactPreference: ContactPreference): void{
    this.contactPreferencesService.updateContactPreference(contactPreference).subscribe({
      next: (contactPreference: any) => {
        this.contactPreference = contactPreference;
        this.setForm();
      },
      error: () => {

      },
      complete: () => {

      }
    });
  }

  private setForm(): void {
    this.form = this.fb.group({
      contactPreferenceId: [this.contactPreference?.contactPreferenceId ?? '00000000-0000-0000-0000-000000000000'],
      phone: [this.contactPreference?.phone ?? '', [Validators.required]],
      isCommunicationByCall: [this.contactPreference?.isCommunicationByCall ?? false],
      isCommunicationBySms: [this.contactPreference?.isCommunicationBySms ?? false],
      isCommunicationByWhatsapp: [this.contactPreference?.isCommunicationByWhatsapp ?? false],
      isCommunicationByEmail: [this.contactPreference?.isCommunicationByEmail ?? false],
      isPromotionByCall: [this.contactPreference?.isPromotionByCall ?? false],
      isPromotionBySms: [this.contactPreference?.isPromotionBySms ?? false],
      isPromotionByWhatsapp: [this.contactPreference?.isPromotionByWhatsapp ?? false],
      isPromotionByEmail: [this.contactPreference?.isPromotionByEmail ?? false],
    });
  }

  private getContactPreference(): void {
    this.contactPreferencesService.getContactPreference().subscribe(
      {
        next: (contactPreference: any) => {
          this.contactPreference = contactPreference;
          this.setForm();
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('getContactPreference complete');
        }
      }
    );
  }
}
