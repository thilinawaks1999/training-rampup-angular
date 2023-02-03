import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class EditService extends BehaviorSubject<Student[]> {
  constructor() {
    super([]);
  }

  private data: Student[] = [];

  public read(): void {
    if (this.data.length) {
      return super.next(this.data);
    }
  }

  public resetItem(dataItem: Student): void {
    if (!dataItem) return;
    const originalDataItemIndex = this.data.findIndex(
      item => item.id === dataItem.id
    );
    this.data[originalDataItemIndex] = {
      ...this.data[originalDataItemIndex],
      ...dataItem,
    };
    super.next(this.data);
  }
}
