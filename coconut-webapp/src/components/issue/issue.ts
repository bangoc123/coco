import { Component, Input } from '@angular/core';

/**
 * Generated class for the IssueComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'issue',
  templateUrl: 'issue.html'
})
export class IssueComponent {

  @Input() data: any;

  constructor() {
    setTimeout(() => {
      console.log(this.data)
    }, 1000);
  }

}
