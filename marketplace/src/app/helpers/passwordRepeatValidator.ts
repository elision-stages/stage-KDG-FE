import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const passwordRepeatValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const passwordRepeat = control.get('passwordRepeat');

  return password && passwordRepeat && password.value !== passwordRepeat.value ? { passwordRepeat: true } : null;
}
