/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSelector } from '@ngrx/store';
import { StudentState } from '../state/studentState';

export const selectStudentState = (state: any) =>
  state.students as StudentState;

export const selectStudents = createSelector(
  selectStudentState,
  (state: StudentState) => state.students
);

export const selectStudentsLoading = createSelector(
  selectStudentState,
  (state: StudentState) => state.isLoading
);

export const selectStudentsError = createSelector(
  selectStudentState,
  (state: StudentState) => state.error
);
