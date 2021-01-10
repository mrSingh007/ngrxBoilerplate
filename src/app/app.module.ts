import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
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
    BrowserModule,
    IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
