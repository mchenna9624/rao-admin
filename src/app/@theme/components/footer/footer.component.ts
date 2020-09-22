import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">

    </span>
    <span class="created-by">
      Powered by <b><a href="http://www.glawen.com" target="_blank">Glawen Technologies</a></b>
    </span>
  `,
})
export class FooterComponent {
}
