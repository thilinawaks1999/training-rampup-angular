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
    if (!dataItem) {
      return;
    }
    const originalDataItem = this.data.find(item => item.id === dataItem.id);
    Object.assign(originalDataItem as never, dataItem);
    super.next(this.data);
  }
}
