import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from "@angular/forms";
import {Router} from "@angular/router";
import getMailHint from "../../helpers/getMailHint";
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  public getMailHint = getMailHint;

  loginForm = new FormGroup({
    mail: new FormControl('', Validators.email),
    password: new FormControl(''),
  });
  registerForm = new FormGroup({
    mail: new FormControl('', Validators.email),
  });

  constructor(private router: Router, private messageService: MessageService) { }

  onLogin(): void {
    // TODO (Already done in other merge request...)
  }

  onRegister(): void {
    sessionStorage.setItem('registerMail', this.registerForm.get('mail').value)
    this.router.navigate(['/register'])
  }
}
