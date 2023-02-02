import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  public data = [
    {
      id: 1,
      name: 'Thilina Sandakelum',
      gender: 'Male',
      address: '187, Heenara, Hakuruwela',
      mobile: '0769493502',
      birthday: new Date('1999-05-28'),
      age: 23,
    },
    {
      id: 2,
      name: 'Anil siriwardhana',
      gender: 'Male',
      address: 'New town, Weeraketiya, Tangalle',
      mobile: '0785643252',
      birthday: new Date('2002-08-18'),
      age: 20,
    },
    {
      id: 3,
      name: 'Hesha Ariyarathne',
      gender: 'Female',
      address: '12/3, Rekawa, Ranna',
      mobile: '0785437981',
      birthday: new Date('1992-06-01'),
      age: 30,
    },
    {
      id: 4,
      name: 'Sithmi Shashirangana',
      gender: 'Female',
      address: '56/7, Pool Road, Beliatta',
      mobile: '0775432173',
      birthday: new Date('1986-07-27'),
      age: 36,
    },
  ];

  public gridState: State = {
    sort: [],
    skip: 0,
    take: 15,
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public formGroup: any;
  private editedRowIndex: number | undefined;

  public onStateChange(state: State): void {
    this.gridState = state;
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

    console.log(student, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    // remove the data item from the data source
    this.data.splice(args.rowIndex, 1);
    // refresh the grid
    args.sender.cancelCell();
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);
    // reset the helpers
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}
