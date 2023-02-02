import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
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
        .get<Student[]>('http://localhost:5000/student')
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
        .post<Student>('http://localhost:5000/student', postObj)
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
        .patch<Student>(`http://localhost:5000/student/${student.id}`, postObj)
        .subscribe((student: Student) => {
          console.log(student);
          observer.next(student);
        });
    });
  }

  public deleteStudent(id: number): Observable<Student> {
    return new Observable<Student>(observer => {
      this.http
        .delete<Student>(`http://localhost:5000/student/${id}`)
        .subscribe((student: Student) => {
          observer.next(student);
        });
    });
  }
}
