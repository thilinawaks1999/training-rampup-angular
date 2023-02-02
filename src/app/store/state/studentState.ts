import { Student } from 'src/app/home-module/models/student';

export interface StudentState {
  students: Student[];
  isLoading: boolean;
  error: null | string;
}
