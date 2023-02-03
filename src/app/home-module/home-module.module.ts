import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { ContainersComponent } from './containers/containers.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { DateInputModule } from '@progress/kendo-angular-dateinputs';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, TableComponent, ContainersComponent],

  imports: [
    CommonModule,
    GridModule,
    NavigationModule,
    IconsModule,

    DropDownListModule,
    DateInputModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class HomeModuleModule {}
