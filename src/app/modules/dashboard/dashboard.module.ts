import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CategoryModule } from '../category/category.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CategoryModule
  ]
})
export class DashboardModule { }
