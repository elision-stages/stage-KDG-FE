import {Component, OnInit} from '@angular/core';
import getMailHint from "../../../helpers/getMailHint";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PasswordService} from "../../../service/password.service";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {MessageService} from "primeng/api";
import {ValidationHelper} from "../../../helpers/ValidationHelper";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  getMailHint: Function = getMailHint;
  readableErrors = ValidationHelper.readableErrors;
  unsafePassword: boolean = false
  isLoading: boolean = false
  success: boolean = false

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), ValidationHelper.passwordValidator]),
    passwordRepeat: new FormControl('')
  }, { validators: ValidationHelper.passwordRepeatValidator });

  constructor(private pwService: PasswordService, public router: Router, private userService: UserService, private messageService: MessageService) {

  }

  ngOnInit() {
    if(sessionStorage.getItem('registerMail') !== null) {
      this.registerForm.get('mail').setValue(sessionStorage.getItem('registerMail'))
    }
  }

  pwnCheck(): void {
    const password = this.registerForm.get('password').value
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

  onRegister(): void {
    this.registerForm.disable()
    this.isLoading = true
    this.userService.register(this.registerForm.value).subscribe({
      next: (_result) => {
        this.success = true
      },
      error: (error) => {
        if(error.status === 409) {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'A user with this e-mail address exists already'});
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Unknown error'});
        }
      }
    }).add(() => {
      this.registerForm.enable()
      this.isLoading = false
    })
  }
}
