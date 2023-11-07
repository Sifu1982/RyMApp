import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './containers/home/home.component';

import { HomeService } from './services/home.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [ HomeService ]
})
export class HomeModule { }
