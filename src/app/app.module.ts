import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModuleModule } from './home-module/home-module.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditService } from './home-module/services/edit.service';

import {
  HttpClient,
  HttpClientModule,
  HttpClientJsonpModule,
} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModuleModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
