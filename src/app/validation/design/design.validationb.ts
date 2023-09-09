import { HiddenOptionValidation } from 'src/app/model/design/hidden-option-validation.model';
import { greaterThan } from '../generic/generic.validation';
import { WritableSignal } from '@angular/core';
import { OptionWindow } from 'src/app/enum/option.enum';

export const isHiddenOption = (
  hddenOptionValidationModel: HiddenOptionValidation,
  currentOption: WritableSignal<OptionWindow>
) => {
  return (
    greaterThan(
      hddenOptionValidationModel.baseNumber,
      hddenOptionValidationModel.comparatorNumber
    ) && !currentOption()
  );
};
