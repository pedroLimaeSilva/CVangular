import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './cv/profile/profile.component';
import { AboutComponent } from './cv/about/about.component';
import { TimelineComponent } from './cv/timeline/timeline.component';
import { SkillsComponent } from './cv/skills/skills.component';
import { CornerComponent } from './corner/corner.component';
import { FooterComponent } from './my-footer/my-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    AboutComponent,
    TimelineComponent,
    SkillsComponent,
    CornerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
