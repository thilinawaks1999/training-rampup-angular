import { createAction, props } from '@ngrx/store';
import { Student } from 'src/app/home-module/models/student';

export const getStudents = createAction('[Students] Get Students');
export const getStudentsSuccess = createAction(
  '[Students] Get Students Success',
  props<{ students: Student[] }>()
);
export const getStudentsFailure = createAction(
  '[Students] Get Students Failure',
  props<{ error: string }>()
);

export const addStudents = createAction(
  '[Students] Add Students',
  props<{ student: Student }>()
);
export const addStudentsSuccess = createAction(
  '[Students] Add Students Success',
  props<{ student: Student }>()
);
export const addStudentsFailure = createAction(
  '[Students] Add Students Failure',
  props<{ error: string }>()
);

export const updateStudents = createAction(
  '[Students] Update Students',
  props<{ student: Student }>()
);
export const updateStudentsSuccess = createAction(
  '[Students] Update Students Success',
  props<{ student: Student }>()
);
export const updateStudentsFailure = createAction(
  '[Students] Update Students Failure',
  props<{ error: string }>()
);

export const deleteStudents = createAction(
  '[Students] Delete Students',
  props<{ student: Student }>()
);
export const deleteStudentsSuccess = createAction(
  '[Students] Delete Students Success',
  props<{ student: Student }>()
);
export const deleteStudentsFailure = createAction(
  '[Students] Delete Students Failure',
  props<{ error: string }>()
);
