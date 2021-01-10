import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActionsComponent } from './actions/actions.component';
import { EffectsComponent } from './effects/effects.component';
import { ReducersComponent } from './reducers/reducers.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionsComponent,
    EffectsComponent,
    ReducersComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
