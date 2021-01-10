import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-effects",
  templateUrl: "./effects.component.html",
  styleUrls: ["./effects.component.scss"],
})
export class EffectsComponent {
  @ViewChild("effectDiv") content: ElementRef;

  @Input()
  name: any = "Pizzas";

  @Input()
  active = false;

  @Output()
  download = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) {}

  get effects() {
    let uperName = this.name.toUpperCase();
    let funName = this.name.replaceAll("_", "");

    const res = `
import { Injectable } from '@angular/core'; <br>
import { Effect, Actions } from '@ngrx/effects'; <br>
import { of } from 'rxjs/observable/of'; <br>
import { map, switchMap, catchError } from 'rxjs/operators'; <br>

import * as actions from '../actions/${funName.toLowerCase()}.action'; <br><br><br>


@Injectable() <br>
export class ${funName}Effects { <br>
  <br>
  constructor( <br>
    private actions$: Actions, <br>
    private service: ${funName}Service <br>
  ) {} <br><br>

  @Effect() <br>
  load${funName}$ = this.actions$.ofType(actions.LOAD_${uperName}).pipe( <br>
    switchMap(() => { <br>
      return this.service <br>
        .get${funName}() <br>
        .pipe( <br>
          map(entities => new actions.Load${funName}Success(entities)), <br>
          catchError(error => of(new actions.Load${funName}Fail(error))) <br>
        ); <br>
    }) <br>
  ); }

`;

    return this.sanitizer.bypassSecurityTrustHtml(res);
  }

  downloadInnerHtml() {
    let elHtml:any = this.content.nativeElement.innerHTML;
    this.download.emit(elHtml);
  }
}
