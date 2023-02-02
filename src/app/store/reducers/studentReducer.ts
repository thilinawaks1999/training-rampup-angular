import { createReducer, on } from '@ngrx/store';
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
  updateStudentsSuccess,
  updateStudentsFailure,
} from '../actions/studentActions';
import { StudentState } from '../state/studentState';

export const initialState: StudentState = {
  students: [],
  isLoading: false,
  error: null,
};

export const studentReducer = createReducer(
  initialState,
  on(getStudents, (state): StudentState => ({ ...state, isLoading: true })),
  on(
    getStudentsSuccess,
    (state, { students }): StudentState => ({
      ...state,
      students: students.map(item => {
        return {
          ...item,
          birthday: new Date(item.birthday as string),
        };
      }),
      isLoading: false,
    })
  ),
  on(
    getStudentsFailure,
    (state, { error }): StudentState => ({ ...state, error, isLoading: false })
  ),
  on(addStudents, (state): StudentState => ({ ...state, isLoading: true })),
  on(
    addStudentsSuccess,
    (state, { student }): StudentState => ({
      ...state,
      students: [
        ...state.students,
        { ...student, birthday: new Date(student.birthday as string) },
      ],
      isLoading: false,
    })
  ),
  on(
    addStudentsFailure,
    (state, { error }): StudentState => ({
      ...state,
      error,
      isLoading: false,
    })
  ),
  on(updateStudents, (state): StudentState => ({ ...state, isLoading: true })),
  on(
    updateStudentsSuccess,
    (state, { student }): StudentState => ({
      ...state,
      students: state.students.map(item => {
        if (item.id === student.id) {
          return {
            ...student,
            birthday: new Date(student.birthday as string),
          };
        }
        return item;
      }),
      isLoading: false,
    })
  ),
  on(
    updateStudentsFailure,
    (state, { error }): StudentState => ({
      ...state,
      error,
      isLoading: false,
    })
  ),
  on(deleteStudents, (state): StudentState => ({ ...state, isLoading: true })),
  on(
    deleteStudentsSuccess,
    (state, { student }): StudentState => ({
      ...state,
      students: state.students.filter(item => item.id !== student.id),
      isLoading: false,
    })
  ),
  on(
    deleteStudentsFailure,
    (state, { error }): StudentState => ({
      ...state,
      error,
      isLoading: false,
    })
  )
);
