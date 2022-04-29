import {VendorService} from "../service/vendor.service";
import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";

export class ValidationHelper {
  static passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const forbidden = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/.test(control.value);
    return !forbidden ? {password: true} : null;
  }

  static passwordRepeatValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordRepeat = control.get('passwordRepeat');

    return password && passwordRepeat && password.value !== passwordRepeat.value ? { passwordRepeat: true } : null;
  }

  static VATValidator(vendorService: VendorService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return vendorService
        .checkVat(control.value, 1)
        .pipe(
          map(res => null), // checkVat only returns result when a business is found => OK
          catchError(err => of({vat: true})) // 404 => Doesn't exist
        )
    }
  }

  static readableErrors(errors: ValidationErrors): string[] {
    let clean: string[] = []
    for (var key in errors) {
      if (errors.hasOwnProperty(key)) {
        switch (key) {
          case 'required':
            clean.push('This field is required.')
            break;
          case 'minlength':
            clean.push('This field has to contain at least ' + errors[key].requiredLength + ' characters.')
            break;
          case 'email':
            clean.push('This isn\'t a valid e-mail address.')
            break;
          case 'password':
            clean.push('A password must contain lowercase characters, uppercase characters and numbers.')
            break;
          case 'passwordRepeat':
            clean.push('The passwords do not match.')
            break;
          case 'vat':
            clean.push('This isn\'t a valid VAT number.')
            break;
          default:
            clean.push('Unknown error: ' + key)
        }
      }
    }
    return clean
  }
}
