import { Injectable } from '@angular/core';
import { EditService } from 'src/app/home-module/services/edit.service';
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

@Injectable()
export class StudentEffects {
  constructor(
    private actions$: Actions,
    private editService: EditService,
    private studentService: StudentServiceService
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
        return this.studentService.addStudent(student).pipe(
          map(student => addStudentsSuccess({ student })),
          catchError(error => [addStudentsFailure({ error })])
        );
      })
    );
  });

  updateStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateStudents),
      mergeMap(({ student }) =>
        this.studentService.updateStudent(student).pipe(
          map(student => updateStudentsSuccess({ student })),
          catchError(error => [updateStudentsFailure({ error })])
        )
      )
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
