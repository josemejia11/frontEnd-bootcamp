import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'src/app/models/video.interface';
import { getAuthToken } from 'src/app/services/auth.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
})
export class VideoDetailComponent implements OnInit {
  public id: string = '';
  public loading: boolean = false;
  public video: Video | undefined = undefined;
  public likes: number = 0;
  public dislikes: number = 0;
  public likeType: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private videoService: VideoService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getVideo();
    this.likesListener();
  }

  private getVideo(): void {
    this.loading = true;
    this.videoService.getVideo(this.id).subscribe(
      (res) => {
        this.loading = false;
        this.video = res;
        this.likes = res.likes.length;
        this.dislikes = res.dislikes.length;

        // Search user token
        const token = getAuthToken();
        if (res.likes.some((item: string) => item == token)) {
          this.likeType = 'likes';
        } else if (res.dislikes.some((item: string) => item == token)) {
          this.likeType = 'dislikes';
        }
      },
      () => {
        this.router.navigate(['home']);
      },
    );
  }

  private likesListener(): void {
    this.videoService.getLike(this.id).subscribe((res: any) => {
      if (res && res.success) {
        this.likes = res.likes;
        this.dislikes = res.dislikes;
      }
    });
  }

  public onLikeClick(type: 'likes' | 'dislikes'): void {
    this.likeType = type;
    this.videoService.sendLike(this.id, type);
  }

  likedVideo() {}
}
