import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import getMailHint from 'src/app/helpers/getMailHint';
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {VendorService} from "../../../service/user/vendor.service";
import {ValidationHelper} from "../../../helpers/ValidationHelper";

@Component({
  selector: 'app-vendor',
  templateUrl: './register-vendor.component.html',
  styleUrls: ['./register-vendor.component.scss'],
  providers: [MessageService]
})
export class RegisterVendorComponent {
  getMailHint: Function = getMailHint;
  readableErrors = ValidationHelper.readableErrors;
  isLoading: boolean = false
  success: boolean = false
  typeWhitelist = ['image/png', 'image/gif', 'image/svg', 'image/jpeg', 'image/jpg']

  vendorForm = new FormGroup({
    vatNumber: new FormControl('', [Validators.required, Validators.minLength(10)], [ValidationHelper.VATValidator(this.vendorService)]),
    businessName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9), ValidationHelper.phoneValidator]),
    logo: new FormControl('', [Validators.required]),
    logoImage: new FormControl('', [Validators.required]),
    theme: new FormControl('', [Validators.required]),
    introduction: new FormControl('', [Validators.required, Validators.minLength(20), Validators.maxLength(5000)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), ValidationHelper.passwordValidator]),
    passwordRepeat: new FormControl('')
  }, { validators: ValidationHelper.passwordRepeatValidator });

  constructor(public router: Router, private vendorService: VendorService, private messageService: MessageService) {

  }

  checkVat() {
    const vat = this.vendorForm.get('vatNumber').value
    if(vat.length < 10 && !this.vendorForm.get('businessName').value.length) return;
    this.vendorService.checkVat(vat).subscribe({
      next: (result) => {
        this.vendorForm.get('businessName').setValue(result.name)
      }
    })
  }

  updatePreview(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length && this.typeWhitelist.includes(fileList[0].type)) {
      document.getElementById('logoPreview').classList.add('selected')
      document.getElementById('logoPreview').style.backgroundImage = "url('" + URL.createObjectURL(fileList[0]) + "')"
      let reader = new FileReader()
      reader.onload = (readerEvt) => {
        this.vendorForm.get('logo').setValue('data:' + fileList[0].type + ';base64,' + btoa(readerEvt.target.result.toString()))
      }
      reader.readAsBinaryString(fileList[0])
    }
  }

  setTheme(event: any) {
    this.vendorForm.get('theme').setValue(event.value)
  }

  setIntroduction(event: any) {
    this.vendorForm.get('introduction').setValue(event.htmlValue)
  }

  onVendorRegister(): void {
    this.vendorForm.disable()
    this.isLoading = true
    this.vendorService.register(this.vendorForm.value).subscribe({
      next: (_result) => {
        this.success = true
      },
      error: (result) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: Object.values(result.error)[0].toString()});
      }
    }).add(() => {
      this.vendorForm.enable()
      this.isLoading = false
    })
  }
}
