import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";
import getMailHint from "../../helpers/getMailHint";
import { MessageService } from 'primeng/api';
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
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

  ngOnInit(): void {
    // ngOnInit is required
  }

  onLogin(): void {
    this.loading = true
    this.authService.login(this.loginForm.get('username').value, this.loginForm.get('password').value).subscribe({
      next: (result) => {
        console.log('Login result', result)
        this.messageService.add({severity:'error', summary: 'Error', detail: 'This service isn\'t implemented yet'});
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  onRegister(): void {
    console.log(this.registerForm)
    sessionStorage.setItem('registerMail', this.registerForm.get('mail').value)
    this.router.navigate(['/register'])
  }
}
