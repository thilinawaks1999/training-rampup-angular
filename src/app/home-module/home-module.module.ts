import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { ContainersComponent } from './containers/containers.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IconsModule } from '@progress/kendo-angular-icons';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from '../store/effects/studentEffect';
import { studentReducer } from '../store/reducers/studentReducer';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { DateInputModule } from '@progress/kendo-angular-dateinputs';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PopupModule } from '@progress/kendo-angular-popup';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { PopupAnchorDirective } from '../utils/directives/popup/popup-anchor.directive';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';

@NgModule({
  declarations: [
    HeaderComponent,
    TableComponent,
    ContainersComponent,
    PopupAnchorDirective,
  ],

  imports: [
    CommonModule,
    GridModule,
    NavigationModule,
    IconsModule,
    StoreModule.forFeature('students', studentReducer),
    EffectsModule.forFeature([StudentEffects]),
    AngularToastifyModule,
    DropDownListModule,
    DateInputModule,
    ReactiveFormsModule,
    FormsModule,
    PopupModule,
    InputsModule,
    DatePickerModule,
  ],
  providers: [ToastService],
})
export class HomeModuleModule {}
