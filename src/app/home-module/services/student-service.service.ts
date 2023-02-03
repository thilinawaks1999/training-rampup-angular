import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
  BaseUrl = 'http://localhost:5000/student';

  constructor(private http: HttpClient) {}

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

  public getStudents(): Observable<Student[]> {
    return new Observable<Student[]>(observer => {
      this.http
        .get<Student[]>(this.BaseUrl)
        .subscribe((students: Student[]) => {
          observer.next(students);
        });
    });
  }

  public addStudent(student: Student): Observable<Student> {
    const postObj = {
      name: student.name,
      mobile: student.mobile,
      address: student.address,
      birthday: student.birthday,
      gender: student.gender,
      age: this.ageCalculation(student.birthday as Date),
    };
    return new Observable<Student>(observer => {
      this.http
        .post<Student>(this.BaseUrl, postObj)
        .subscribe((student: Student) => {
          observer.next(student);
        });
    });
  }

  public updateStudent(student: Student): Observable<Student> {
    const postObj = {
      id: student.id,
      name: student.name,
      mobile: student.mobile,
      address: student.address,
      birthday: student.birthday,
      gender: student.gender,
      age: this.ageCalculation(student.birthday as Date),
    };
    return new Observable<Student>(observer => {
      this.http
        .patch<Student>(`${this.BaseUrl}/${student.id}`, postObj)
        .subscribe((student: Student) => {
          observer.next(student);
        });
    });
  }

  public deleteStudent(id: number): Observable<Student> {
    return new Observable<Student>(observer => {
      this.http
        .delete<Student>(`${this.BaseUrl}/${id}`)
        .subscribe((student: Student) => {
          observer.next(student);
        });
    });
  }
}
