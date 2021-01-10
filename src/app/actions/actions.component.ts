import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-actions",
  templateUrl: "./actions.component.html",
  styleUrls: ["./actions.component.scss"],
})
export class ActionsComponent {
  @ViewChild("actionDiv") content: ElementRef;

  @Input()
  name: any = "Pizzas";

  @Input()
  active = false;

  @Output()
  download = new EventEmitter<any>();

  constructor(private sanitizer: DomSanitizer) {}

  get actions() {
    let uperName = this.name.toUpperCase();
    let funName = this.name.replaceAll("_", "");

    const res = `import { Action } from '@ngrx/store';<br>

export const LOAD_${uperName} = '[${this.name}] Load ${this.name}';<br>
export const LOAD_${uperName}_FAIL = '[${this.name}] Load ${this.name} Fail';<br>
export const LOAD_${uperName}_SUCCESS = '[${this.name}] Load ${this.name} Success';<br><br>

export class Load${funName} implements Action { <br>
  readonly type = LOAD_${uperName}; <br>
} <br>

export class Load${funName}Fail implements Action { <br>
  readonly type = LOAD_${uperName}_FAIL; <br>
  constructor(public payload: any) {} <br>
}
<br>
export class Load${funName}Success implements Action { <br>
  readonly type = LOAD_${uperName}_SUCCESS; <br>
  constructor(public payload: any[]) {} <br>
} <br>
<br>
export type ${funName}Action = Load${funName} | Load${funName}Fail | Load${funName}Success;
    `;
    return this.sanitizer.bypassSecurityTrustHtml(res);
  }

  downloadInnerHtml() {
    let elHtml: any = this.content.nativeElement.innerHTML;
    this.download.emit(elHtml);
  }
}
