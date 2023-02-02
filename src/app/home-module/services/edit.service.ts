import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EditService extends BehaviorSubject<Student[]> {
  constructor(private http: HttpClient) {
    super([]);
  }

  private data: Student[] = [];

  public ageCalculation(birthday: Date): number {
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

  public save(data: Student, isNew?: boolean): void {
    if (!this.validate(data)) return;
    if (isNew) {
      this.addStudent(data);
    } else {
      this.updateStudent(data);
    }

    this.reset();
  }

  public remove(data: Student): void {
    this.deleteStudent(data.id as number);
    this.reset();
  }

  public resetItem(dataItem: Student): void {
    if (!dataItem) {
      return;
    }

    // find orignal data item
    const originalDataItem = this.data.find(item => item.id === dataItem.id);

    // revert changes
    Object.assign(originalDataItem as never, dataItem);

    super.next(this.data);
  }

  private reset() {
    this.data = [];
  }

  /////////////////////////////////////////////

  getData(): Observable<any> {
    return this.http.get('http://localhost:5000/student').pipe(
      map((response: any) => {
        const responseWithDateObject = response.map((item: any) => {
          return {
            ...item,
            birthday: new Date(item.birthday),
          };
        });
        return responseWithDateObject;
      })
    );
  }

  addStudent(student: Student) {
    const add = {
      name: student.name,
      address: student.address,
      age: this.ageCalculation(student.birthday as Date),
      birthday: student.birthday,
      gender: student.gender,
      mobile: student.mobile,
    };

    return this.http.post('http://localhost:5000/student', add).subscribe();
  }

  deleteStudent(id: number) {
    return this.http.delete(`http://localhost:5000/student/${id}`).subscribe();
  }

  updateStudent(student: Student) {
    const id = student.id;
    const update = {
      name: student.name,
      address: student.address,
      age: this.ageCalculation(student.birthday as Date),
      birthday: student.birthday,
      gender: student.gender,
      mobile: student.mobile,
    };

    return this.http
      .patch(`http://localhost:5000/student/${id}`, update)
      .subscribe();
  }
}
