import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { VideoFormRoutingModule } from './video-form-routing.module';
import { VideoFormComponent } from './components/video-form.component';

@NgModule({
  declarations: [VideoFormComponent],
  imports: [
    CommonModule,
    VideoFormRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class VideoFormModule {}
