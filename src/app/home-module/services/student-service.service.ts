import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
  BaseUrl = environment.BaseUrL;

  constructor(private http: HttpClient) {}

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.BaseUrl);
  }

  public addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.BaseUrl, student);
  }

  public updateStudent(student: Student): Observable<Student> {
    return this.http.patch<Student>(`${this.BaseUrl}/${student.id}`, student);
  }

  public deleteStudent(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.BaseUrl}/${id}`);
  }
}
