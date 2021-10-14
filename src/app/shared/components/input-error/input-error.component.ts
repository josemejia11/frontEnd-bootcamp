import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

interface IObjectKeys {
  [key: string]: string;
}

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent {
  @Input() control: AbstractControl | undefined;
  @Input() name: string = 'This';
  @Input() id: string = '';

  private errorMessages: IObjectKeys = {
    // General messages
    invalid: 'Invalid information, try again',
    required: '{name} is required',
    email: 'Invalid email address',
    number: 'Invalid number, try again',
    minlength: 'The minimum of characters will be {value}',
    maxlength: 'The maximum of characters will be {value}',
  };

  /**
   * Get current control error message
   * @returns string
   */
  public getError(): string {
    const errors = this.control?.errors;
    if (!errors || !Object.keys(errors).length) {
      return '';
    }

    const errType = Object.keys(errors)[0];
    let errMsg: string = this.errorMessages[errType] || this.errorMessages.invalid;
    errMsg = errMsg.replace(/\{name\}/g, this.name);

    if (errors[errType].requiredLength) {
      errMsg = errMsg.replace(/\{value\}/g, errors[errType].requiredLength);
    }
    return errMsg;
  }
}
