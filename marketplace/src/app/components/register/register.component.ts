import {Component, OnInit, ViewChild} from '@angular/core';
import getMailHint from "../../helpers/getMailHint";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {PasswordService} from "../../service/password.service";
import {passwordValidator} from "../../helpers/passwordValidator";
import {passwordRepeatValidator} from "../../helpers/passwordRepeatValidator";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  getMailHint: Function = getMailHint;
  unsafePassword: boolean = false
  isLoading: boolean = false
  success: boolean = false

  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    familyname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), passwordValidator()]),
    passwordRepeat: new FormControl('')
  }, { validators: passwordRepeatValidator });

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
      next: (result) => {
        console.log('User registered', result)
        this.success = true
      },
      error: (error) => {
        console.log('error')
        console.log(error)
        console.log(this.messageService)
        if(error.status === 409) {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'A user with this e-mail address exists already'});
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Unknown error'});
        }
        console.log('error')
        console.log(error)
      }
    }).add(() => {
      this.registerForm.enable()
      this.isLoading = false
    })
  }

  readableErrors(errors: ValidationErrors): string[] {
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
          default:
            clean.push('Unknown error: ' + key)
        }
      }
    }
    return clean
  }
}
