import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import getMailHint from 'src/app/helpers/getMailHint';
import {PasswordService} from "../../../service/password.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {VendorService} from "../../../service/vendor.service";
import {ValidationHelper} from "../../../helpers/ValidationHelper";

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
  providers: [MessageService]
})
export class VendorComponent {
  getMailHint: Function = getMailHint;
  readableErrors = ValidationHelper.readableErrors;
  isLoading: boolean = false
  success: boolean = false

  vendorForm = new FormGroup({
    vat: new FormControl('', [Validators.required, Validators.minLength(10)], [ValidationHelper.VATValidator(this.vendorService)]),
    business: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9), ValidationHelper.phoneValidator]),
    logo: new FormControl('', [Validators.required]),
    logoImage: new FormControl('', [Validators.required]),
    theme: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(50)]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), ValidationHelper.passwordValidator]),
    passwordRepeat: new FormControl('')
  }, { validators: ValidationHelper.passwordRepeatValidator });

  constructor(public router: Router, private vendorService: VendorService, private messageService: MessageService) {

  }

  checkVat() {
    const vat = this.vendorForm.get('vat').value
    if(vat.length < 10 && !this.vendorForm.get('business').value.length) return;
    this.vendorService.checkVat(vat).subscribe({
      next: (result) => {
        this.vendorForm.get('business').setValue(result.name)
      }
    })
  }

  updatePreview(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList && fileList.length) {
      document.getElementById('logoPreview').classList.add('selected')
      document.getElementById('logoPreview').style.backgroundImage = "url('" + URL.createObjectURL(fileList[0]) + "')"
      this.vendorForm.patchValue({
        logoImage: fileList[0]
      });
    }
  }

  setTheme(event: any) {
    this.vendorForm.get('theme').setValue(event.value)
  }

  setDescription(event: any) {
    this.vendorForm.get('description').setValue(event.htmlValue)
  }

  onVendorRegister(): void {
    this.vendorForm.disable()
    this.isLoading = true
    this.vendorService.register(this.vendorForm.value).subscribe({
      next: (_result) => {
        this.success = true
      },
      error: (error) => {
        if(error.status === 409) {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'A vendor with this e-mail address exists already'});
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Unknown error'});
        }
      }
    }).add(() => {
      this.vendorForm.enable()
      this.isLoading = false
    })
  }
}
