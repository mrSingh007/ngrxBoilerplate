import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'store';

  entityName="Pizzas";

  //actions
  actionFileOpen=false;

  //effects
  effectFileOpen=false;

  //reducer
  reducerFileOpen= false;



  entityNameChanged($ev:string){
    this.entityName=$ev;
  }
}
