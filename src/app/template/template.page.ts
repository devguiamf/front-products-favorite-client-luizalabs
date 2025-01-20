import { Component } from '@angular/core';
import { HeaderComponent } from "../common/components/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'template-page',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './template.page.html'
})
export class TemplatePage {

}
