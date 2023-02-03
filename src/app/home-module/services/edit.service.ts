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
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  public read(): void {
    if (this.data.length) {
      return super.next(this.data);
    }
  }

  public save(data: Student, isNew?: boolean): void {
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
