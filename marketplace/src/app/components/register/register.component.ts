import {Component, OnInit, ViewChild} from '@angular/core';
import getMailHint from "../../helpers/getMailHint";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public getMailHint = getMailHint;

  @ViewChild('password') pw

  registerForm = new FormGroup({
    firstname: new FormControl(''),
    mail: new FormControl('', Validators.email),
    password: new FormControl('')
  });

  constructor() { /* TODO document why this constructor is empty */  }

  ngOnInit(): void {
    this.pw.onMaskToggle = () => {
      this.pw.unmasked = !this.pw.unmasked;
      console.log('ok?')
    }
    if(sessionStorage.getItem('registerMail') !== null) {
      this.registerForm.get('mail').setValue(sessionStorage.getItem('registerMail'))
    }
  }

  ngA

  onRegister(): void {
    // TODO
  }

}
