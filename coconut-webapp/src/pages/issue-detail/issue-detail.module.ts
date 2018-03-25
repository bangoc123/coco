import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IssueDetailPage } from './issue-detail';

@NgModule({
  declarations: [
    IssueDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(IssueDetailPage),
  ],
})
export class IssueDetailPageModule {}
