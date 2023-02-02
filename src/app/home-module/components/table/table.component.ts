import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { selectStudents } from '../../../store/selectors/studentSelector';
import {
  getStudents,
  addStudents,
  updateStudents,
  deleteStudents,
} from '../../../store/actions/studentActions';

import {
  GridComponent,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  AddEvent,
} from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Student } from '../../models/student';
import { EditService } from '../../services/edit.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 15,
  };

  students$!: Observable<Student[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public formGroup: any;
  private editedRowIndex: number | undefined;

  constructor(private editService: EditService, private store: Store) {}

  public ngOnInit(): void {
    this.students$ = this.store.select(selectStudents);
    this.store.dispatch(getStudents());
  }

  public onStateChange(state: State): void {
    this.gridState = state;
    this.editService.read();
  }

  public addHandler(args: AddEvent): void {
    this.closeEditor(args.sender);
    // define all editable fields validators and default values
    this.formGroup = new FormGroup({
      id: new FormControl(),
      name: new FormControl('', Validators.required),
      age: new FormControl(),
      address: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
    });
    // show the new row editor, with the `FormGroup` build above
    args.sender.addRow(this.formGroup);
  }

  public editHandler(args: EditEvent): void {
    // define all editable fields validators and default values
    const { dataItem } = args;
    this.closeEditor(args.sender);
    this.formGroup = new FormGroup({
      id: new FormControl(dataItem.id),
      name: new FormControl(dataItem.name, Validators.required),
      age: new FormControl(dataItem.age),
      address: new FormControl(dataItem.address, Validators.required),
      mobile: new FormControl(dataItem.mobile, Validators.required),
      gender: new FormControl(dataItem.gender, Validators.required),
      birthday: new FormControl(dataItem.birthday, Validators.required),
    });

    this.editedRowIndex = args.rowIndex;
    // put the row in edit mode, with the `FormGroup` build above
    args.sender.editRow(args.rowIndex, this.formGroup);
  }

  public cancelHandler(args: CancelEvent): void {
    // close the editor for the given row
    this.closeEditor(args.sender, args.rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }: SaveEvent): void {
    const student: Student = formGroup.value;

    if (isNew) {
      this.store.dispatch(addStudents({ student }));
    } else {
      this.store.dispatch(updateStudents({ student }));
    }
    sender.closeRow(rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    // remove the current dataItem from the current data source,
    this.store.dispatch(deleteStudents({ student: args.dataItem }));
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);
    // reset the helpers
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}
