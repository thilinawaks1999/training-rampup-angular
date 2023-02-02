import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class EditService extends BehaviorSubject<Student[]> {
  constructor() {
    super([]);
  }

  private data: Student[] = [];
  //validations

  public nameValidation(name: string): boolean {
    const regex = new RegExp(/^[a-zA-Z\s]*$/);
    return regex.test(name);
  }

  public phoneNumberValidation(mobile: string): boolean {
    const regex = new RegExp(/^[0-9]{10}$/);
    return regex.test(mobile);
  }

  public addressValidation(address: string): boolean {
    const regex = new RegExp(/^[a-zA-Z0-9\s,/'-]*$/);
    return regex.test(address);
  }

  public validate(dataItem: Student): { valid: boolean; message?: string } {
    if (!dataItem) {
      return { valid: false, message: 'Please enter the details' };
    }

    if (!this.nameValidation(dataItem.name as string)) {
      return { valid: false, message: 'Please enter the valid name' };
    }

    if (!this.phoneNumberValidation(dataItem.mobile as string)) {
      return { valid: false, message: 'Please enter the valid mobile number' };
    }

    if (!this.addressValidation(dataItem.address as string)) {
      return { valid: false, message: 'Please enter the valid address' };
    }
    return { valid: true };
  }

  public read(): void {
    if (this.data.length) {
      return super.next(this.data);
    }
  }

  public resetItem(dataItem: Student): void {
    if (!dataItem) {
      return;
    }
    const originalDataItem = this.data.find(item => item.id === dataItem.id);
    Object.assign(originalDataItem as never, dataItem);
    super.next(this.data);
  }
}
