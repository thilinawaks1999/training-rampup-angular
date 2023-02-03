import { Injectable } from '@angular/core';
import { StudentServiceService } from 'src/app/home-module/services/student-service.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  addStudents,
  addStudentsFailure,
  addStudentsSuccess,
  deleteStudents,
  deleteStudentsFailure,
  deleteStudentsSuccess,
  getStudents,
  getStudentsFailure,
  getStudentsSuccess,
  updateStudents,
  updateStudentsFailure,
  updateStudentsSuccess,
} from '../actions/studentActions';
import { Student } from 'src/app/home-module/models/student';
import { EditService } from './../../home-module/services/edit.service';

@Injectable()
export class StudentEffects {
  constructor(
    private actions$: Actions,
    private studentService: StudentServiceService,
    private editService: EditService
  ) {}

  getStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getStudents),
      mergeMap(() => {
        return this.studentService.getStudents().pipe(
          map(students => getStudentsSuccess({ students })),
          catchError(error => [getStudentsFailure({ error })])
        );
      })
    );
  });

  addStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addStudents),
      mergeMap(({ student }) => {
        const postStudent = {
          name: student.name,
          mobile: student.mobile,
          address: student.address,
          birthday: student.birthday,
          gender: student.gender,
          age: this.editService.ageCalculation(student.birthday as Date),
        } as Student;
        return this.studentService.addStudent(postStudent).pipe(
          map(student => addStudentsSuccess({ student })),
          catchError(error => [addStudentsFailure({ error })])
        );
      })
    );
  });

  updateStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateStudents),
      mergeMap(({ student }) => {
        const postStudent = {
          id: student.id,
          name: student.name,
          mobile: student.mobile,
          address: student.address,
          birthday: student.birthday,
          gender: student.gender,
          age: this.editService.ageCalculation(student.birthday as Date),
        } as Student;

        return this.studentService.updateStudent(postStudent).pipe(
          map(student => updateStudentsSuccess({ student })),
          catchError(error => [updateStudentsFailure({ error })])
        );
      })
    );
  });

  deleteStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteStudents),
      mergeMap(({ student }) =>
        this.studentService.deleteStudent(student.id as number).pipe(
          map(student => deleteStudentsSuccess({ student })),
          catchError(error => [deleteStudentsFailure({ error })])
        )
      )
    );
  });
}
