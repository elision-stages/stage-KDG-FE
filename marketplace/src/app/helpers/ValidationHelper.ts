import {VendorService} from "../service/user/vendor.service";
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
        .checkVat(control.value)
        .pipe(
          map(_res => null), // checkVat only returns result when a business is found => OK
          catchError(_err => of({vat: true})) // 404 => Doesn't exist
        )
    }
  }

  static phoneValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return /^\d+$/.test(control.value) ? null : { phone: true }
  }

  static httpsValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let url;

    try {
      url = new URL(control.value);
    } catch (_) {
      return { url: true };
    }

    return url.protocol === "https:" ? null : { https: true }
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
          case 'phone':
            clean.push('A phone number may only contain digits.')
            break;
          case 'url':
            clean.push('This isn\'t a valid URL.')
            break;
          case 'https':
            clean.push('This URL must use the https protocol.')
            break;
          default:
            clean.push('Unknown error: ' + key)
        }
      }
    }
    return clean
  }
}
