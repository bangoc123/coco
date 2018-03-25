import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { IssueComponent } from './issue/issue';

@NgModule({
	declarations: [IssueComponent],
	imports: [IonicModule],
	exports: [IssueComponent]
})
export class ComponentsModule { }
