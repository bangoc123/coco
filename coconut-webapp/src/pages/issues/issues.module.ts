import { ComponentsModule } from '../../components/components.module'
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IssuesPage } from './issues';
@NgModule({
  declarations: [
    IssuesPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(IssuesPage)
  ]
})
export class IssuesPageModule { }
