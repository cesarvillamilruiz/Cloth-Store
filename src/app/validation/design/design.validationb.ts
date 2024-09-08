import { HiddenOptionValidation } from 'src/app/model/Utility/hidden-option-validation.model';
import { isGreaterThan } from '../generic/generic.validation';
import { WritableSignal } from '@angular/core';
import { OptionWindow } from 'src/app/enum/option.enum';

export const isHiddenOption = (
  hddenOptionValidationModel: HiddenOptionValidation,
  currentOption: WritableSignal<OptionWindow>
) => {
  return (
    isGreaterThan(
      hddenOptionValidationModel.baseNumber,
      hddenOptionValidationModel.comparatorNumber
    ) && !currentOption()
  );
};
