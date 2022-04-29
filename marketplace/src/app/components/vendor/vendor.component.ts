import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import getMailHint from 'src/app/helpers/getMailHint';
import {PasswordService} from "../../service/password.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {VendorService} from "../../service/vendor.service";
import {ValidationHelper} from "../../helpers/ValidationHelper";

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
  providers: [MessageService]
})
export class VendorComponent {
  getMailHint: Function = getMailHint;
  readableErrors = ValidationHelper.readableErrors;
  unsafePassword: boolean = false
  isLoading: boolean = false
  success: boolean = false

  vendorForm = new FormGroup({
    vat: new FormControl('', [Validators.required, Validators.minLength(10)], [ValidationHelper.VATValidator(this.vendorService)]),
    business: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(2)]),
    logo: new FormControl('', [Validators.required]),
    theme: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    familyname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), ValidationHelper.passwordValidator]),
    passwordRepeat: new FormControl('')
  }, { validators: ValidationHelper.passwordRepeatValidator });

  constructor(private pwService: PasswordService, public router: Router, private vendorService: VendorService, private messageService: MessageService) {

  }

  checkVat() {
    const vat = this.vendorForm.get('vat').value
    if(vat.length < 10 && !this.vendorForm.get('business').value.length) return;
    this.vendorService.checkVat(vat).subscribe({
      next: (result) => {
        this.vendorForm.get('business').setValue(result.name)
      }
    })
    // http://localhost:8080/vendor/vat/BE0776947729
  }

  updatePreview(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length) {
      document.getElementById('logoPreview').classList.add('selected')
      document.getElementById('logoPreview').style.backgroundImage = "url('" + URL.createObjectURL(fileList[0]) + "')"
    }
  }

  pwnCheck(): void {
    const password = this.vendorForm.get('password').value
    if(password.length < 8) {
      this.unsafePassword = false
      return
    }
    this.pwService
      .cancel()
      .checkPassword(password).then((result) => {
      this.unsafePassword = result > 0
    })
  }

  setTheme(event: any) {
    this.vendorForm.get('theme').setValue(event.value)
  }

  onVendorRegister(): void {
    // TODO
  }
}
