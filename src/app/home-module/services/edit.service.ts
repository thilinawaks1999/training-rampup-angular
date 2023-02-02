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

  ageCalculation(birthday: Date): number {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

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

  public validate(dataItem: Student): boolean {
    if (!dataItem) {
      console.log('dataItem is null');
      return false;
    }

    if (!this.nameValidation(dataItem.name as string)) {
      console.log('name is not valid');
      return false;
    }

    if (!this.phoneNumberValidation(dataItem.mobile as string)) {
      console.log('mobile is not valid');
      return false;
    }

    if (!this.addressValidation(dataItem.address as string)) {
      console.log('address is not valid');
      return false;
    }

    return true;
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
