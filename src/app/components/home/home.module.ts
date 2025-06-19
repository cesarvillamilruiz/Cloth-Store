import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LandingComponent } from './landing/landing.component';
import { HomeRoutingModule } from './home-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LandingComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HomeModule { }
