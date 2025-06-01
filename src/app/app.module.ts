import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstimatePaperComponent } from './estimate-paper/estimate-paper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // ✅ Import this
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { MainComponent } from './main/main.component';
import { HtmlParser } from '@angular/compiler';

@NgModule({
  declarations: [
    AppComponent,
    EstimatePaperComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule ,
    AgGridModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
