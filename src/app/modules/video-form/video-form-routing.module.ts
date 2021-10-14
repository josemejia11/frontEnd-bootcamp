import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoFormComponent } from './components/video-form.component';

const routes: Routes = [{ path: '', component: VideoFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoFormRoutingModule {}
