import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from './shared/shared.module';
import { MenuComponent } from './menu/menu.component';
import { FormComponent } from './form/form.component';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { SideNavComponent } from './menu/side-nav/side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FormComponent,
    ProfileListComponent,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
