import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimatePaperComponent } from './estimate-paper/estimate-paper.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'estimate',
    component: MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
