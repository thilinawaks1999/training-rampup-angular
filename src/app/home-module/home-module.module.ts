import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { ContainersComponent } from './containers/containers.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { IconsModule } from '@progress/kendo-angular-icons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from '../store/effects/studentEffect';
import { studentReducer } from '../store/reducers/studentReducer';

@NgModule({
  declarations: [HeaderComponent, TableComponent, ContainersComponent],

  imports: [
    CommonModule,
    GridModule,
    NavigationModule,
    IconsModule,
    DropDownsModule,
    StoreModule.forFeature('students', studentReducer),
    EffectsModule.forFeature([StudentEffects]),
  ],
})
export class HomeModuleModule {}
