import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reducers',
  templateUrl: './reducers.component.html',
  styleUrls: ['./reducers.component.scss']
})
export class ReducersComponent {

  @ViewChild("reducerDiv") content: ElementRef;

  @Input()
  name:any="Pizzas";

  @Input()
  active=false;

  constructor(private sanitizer: DomSanitizer) {}

  get reducers() {
    let uperName = this.name.toUpperCase();
    let funName = this.name.replaceAll("_","");
  const res = `
import * as fromActions from '../actions/${funName.toLowerCase()}.action'; <br>

export interface ${funName}State { <br>
 &nbsp; entities: { [id: string]: any };  <br>
 &nbsp; loaded: boolean;  <br>
 &nbsp; loading: boolean; <br>
} <br><br>

export const initialState: ${funName}State = { <br>
  &nbsp; entities: {}, <br>
  &nbsp; loaded: false,  <br>
  &nbsp; loading: false, <br>
};  <br><br>

export function reducer(  <br>
  &nbsp; state = initialState, <br>
  &nbsp; action: fromActions.${funName}Action <br>
): ${funName}State { <br>
  &nbsp;switch (action.type) {  <br>
    &nbsp;case fromActions.LOAD_${uperName}: {  <br>
      &nbsp;return {  <br>
        &nbsp; ...state, <br>
        &nbsp; loading: true,  <br>
        &nbsp; };  <br>
      &nbsp;} <br><br>

    case fromActions. LOAD_${uperName}_SUCCESS: {  <br>
      &nbsp;const result = action.payload;  <br>
      &nbsp;const entities = result.reduce( <br>
        &nbsp;(entities: { [id: string]: any }, entry: any) => {  <br>
          &nbsp; return {  <br>
            &nbsp; ...entities,  <br>
            &nbsp; [entry.id]: entry,  <br>
            &nbsp;  };  <br>
            &nbsp;  },  <br>
        { <br>
          ...state.entities,  <br>
        } <br>
      );  <br><br>

      return {  <br>
        ...state, <br>
        loading: false, <br>
        loaded: true, <br>
        entities, <br>
      };  <br>
    } <br> <br>

    case fromActions.LOAD_${uperName}_FAIL: { <br>
      return {  <br>
        ...state, <br>
        loading: false, <br>
        loaded: false,  <br>
      };  <br>
    } <br>
  } <br><br>

  return state; <br>
}
  `;

  return this.sanitizer.bypassSecurityTrustHtml(res);

  }


  downloadInnerHtml(){
    let funName:string = this.name.replaceAll("_","");
    let filename = funName.toLowerCase()+".reducer.ts";
    let elHtml:any = this.content.nativeElement.innerHTML;
    console.log(elHtml);

    elHtml = elHtml.replaceAll("<br>","");
    elHtml = elHtml.replaceAll("&gt;",">");
    elHtml = elHtml.replaceAll("&nbsp;","");
    var link = document.createElement("a");
    let mimeType = "text/plain";

    link.setAttribute("download", filename);
    link.setAttribute(
      "href",
      "data:" + mimeType + ";charset=utf-8," + encodeURIComponent(elHtml)
    );
    link.click();
  }

}
