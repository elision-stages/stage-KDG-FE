import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/.test(control.value);
    return !forbidden ? {password: true} : null;
  };
}
