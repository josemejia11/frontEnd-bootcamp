import { Component } from '@angular/core';
import { VideoService } from 'src/app/services/video.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css'],
})
export class VideoFormComponent {
  public form = new FormGroup({
    videoName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(private videoService: VideoService) {}

  /**
   * gets the uploaded file in the form
   * @param event
   */
  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    let file: string | File = '';
    if (target.files && target.files.length > 0) {
      file = target.files[0];
    }
    this.form.controls.fileSource.setValue(file);
  }

  /**
   * Submits the inserted data to the database
   */
  public onSubmit(): void {
    const formValue = this.form.getRawValue();
    const formData = new FormData();
    formData.append('name', formValue.videoName);
    formData.append('description', formValue.description);
    formData.append('file', formValue.fileSource);
    this.videoService.postNewVideo(formData).subscribe(
      () => {
        this.form.reset();
        Swal.fire('Video uploaded', '', 'success');
      },
      () => {
        Swal.fire({
          icon: 'error',
          title: 'Error while uploading video',
        });
      },
    );
  }
}
