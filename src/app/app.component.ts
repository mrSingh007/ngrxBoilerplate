import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "store";

  entityName: any = "Pizzas";

  //actions
  actionFileOpen = false;

  //effects
  effectFileOpen = false;

  //reducer
  reducerFileOpen = false;

  entityNameChanged($ev: string) {
    this.entityName = $ev;
  }

  createFile(elHtml: any, kind: "reducer" | "effect" | "action") {
    let funName: string = this.entityName.replaceAll("_", "");
    let filename = funName.toLowerCase() + "." + kind + ".ts";

    elHtml = elHtml.replaceAll("<br>", "");
    elHtml = elHtml.replaceAll("&gt;", ">");
    elHtml = elHtml.replaceAll("&nbsp;", "");
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
