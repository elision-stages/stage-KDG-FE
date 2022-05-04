import {Component, Input} from '@angular/core';
import {PasswordService} from "../../service/password.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-custom-password-input',
  templateUrl: './custom-password-input.component.html',
  styleUrls: ['./custom-password-input.component.scss']
})
export class CustomPasswordInputComponent {
  @Input() formGroupParent: FormGroup;
  @Input() formGroupControlName: string;

  // FormControl store validators
  control: FormControl;
  unsafePassword: boolean = false

  constructor(private pwService: PasswordService) {

  }

  ngOnInit() {
    this.control = <FormControl>this.formGroupParent.get(this.formGroupControlName);
  }

  pwnCheck(): void {
    const password = this.control.value
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

}
