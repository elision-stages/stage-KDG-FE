import {Component, Input, OnInit} from '@angular/core';
import {ValidationHelper} from "../../helpers/ValidationHelper";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'attribute-form',
  templateUrl: './attribute-form.component.html',
  styleUrls: ['./attribute-form.component.scss']
})
export class AttributeFormComponent implements OnInit {
  dialog: boolean = false

  characteristic: FormGroup

  @Input() attributeTypes: {label: string, value: string}[]
  @Input() requiredTypes: {label: string, value: boolean}[]

  @Input() add: (characteristic: FormGroup) => void;

  @Input() events: Observable<void>
  eventSubscription: Subscription

  readableErrors = ValidationHelper.readableErrors

  ngOnInit(): void {
    this.characteristic = AttributeFormComponent.createCharacteristic()
    this.eventSubscription = this.events.subscribe(() => this.dialog = true)
  }

  ngOnDestroy() {
    this.eventSubscription.unsubscribe();
  }

  hideDialog() {
    this.dialog = false
  }

  static createCharacteristic(name = '', type = 'INTEGER', required = false) {
    return new FormGroup({
      name: new FormControl(name, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]),
      type: new FormControl(type, [Validators.required]),
      required: new FormControl(required, [Validators.required])
    })
  }

  submit() {
    if(this.characteristic.controls['name'].invalid) return
    this.dialog = false
    this.add(this.characteristic)
    this.characteristic = AttributeFormComponent.createCharacteristic();
  }
}
