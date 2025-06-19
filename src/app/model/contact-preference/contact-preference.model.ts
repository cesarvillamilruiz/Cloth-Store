interface IContactPreference {
  contactPreferenceId: string;
  isCommunicationByCall: boolean;
  isCommunicationBySms: boolean;
  isCommunicationByWhatsapp: boolean;
  isCommunicationByEmail: boolean;

  isPromotionByCall: boolean;
  isPromotionBySms: boolean;
  isPromotionByWhatsapp: boolean;
  isPromotionByEmail: boolean;

  phone: string;
}


export class ContactPreference implements IContactPreference {
  contactPreferenceId: string;
  isCommunicationByCall: boolean;
  isCommunicationBySms: boolean;
  isCommunicationByWhatsapp: boolean;
  isCommunicationByEmail: boolean;

  isPromotionByCall: boolean;
  isPromotionBySms: boolean;
  isPromotionByWhatsapp: boolean;
  isPromotionByEmail: boolean;

  phone: string;
}
