import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  GridComponent,
  GridDataResult,
  CancelEvent,
  EditEvent,
  RemoveEvent,
  SaveEvent,
  AddEvent,
} from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { Student } from '../../models/student';
import { EditService } from '../../services/edit.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public view: Observable<GridDataResult> | undefined;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 15,
  };

  public genderData = ['Male', 'Female', 'Other'];
  public formGroup: any;
  private editedRowIndex: number | undefined;

  constructor(private editService: EditService) {}

  public ngOnInit(): void {
    this.view = this.editService.getData();
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

    this.editService.save(student, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler(args: RemoveEvent): void {
    // remove the current dataItem from the current data source,
    // `editService` in this example
    this.editService.remove(args.dataItem);
  }

  private closeEditor(grid: GridComponent, rowIndex = this.editedRowIndex) {
    // close the editor
    grid.closeRow(rowIndex);
    // reset the helpers
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
}
