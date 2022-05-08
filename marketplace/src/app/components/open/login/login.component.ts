import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";
import getMailHint from "../../../helpers/getMailHint";
import { MessageService } from 'primeng/api';
import {AuthService} from "../../../service/auth.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  public getMailHint = getMailHint;

  loading: boolean = false
  loginForm = new FormGroup({
    mail: new FormControl('', Validators.email),
    password: new FormControl(''),
  })

  registerForm = new FormGroup({
    mail: new FormControl('', Validators.email),
  })

  constructor(private router: Router, private messageService: MessageService, private authService: AuthService) { }

  onLogin(): void {
    this.loading = true
    this.authService.login(this.loginForm.get('mail').value, this.loginForm.get('password').value).pipe(
      finalize(() => {
        this.loading = false
      })
    ).subscribe({
      next: (_result) => {
        this.messageService.add({severity:'success', summary: 'Login successfull', detail: 'Hooray'});
      },
      error: (error) => {
        if(error.status === 401) {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Unknown credentials'});
        }else{
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Unknown error: '});
        }
      }
    })
  }

  onRegister(): void {
    console.log(this.registerForm)
    sessionStorage.setItem('registerMail', this.registerForm.get('mail').value)
    this.router.navigate(['/register'])
  }

}
