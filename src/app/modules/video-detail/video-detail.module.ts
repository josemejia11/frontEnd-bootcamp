import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { VideoDetailRoutingModule } from './video-detail-routing.module';
import { VideoDetailComponent } from './components/video-detail.component';

@NgModule({
  declarations: [VideoDetailComponent],
  imports: [CommonModule, VideoDetailRoutingModule, SharedModule],
})
export class VideoDetailModule {}
