import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { Video } from 'src/app/models/video.interface';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private alive: boolean = true;
  public loading: boolean = false;
  public videos: Video[] = [];

  constructor(private route: ActivatedRoute, private videoService: VideoService) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeWhile(() => this.alive)).subscribe(({ search }) => {
      this.getVideos(search);
    });
  }

  /**
   * Brings all the videos on the database and shows them on /home
   * @param search string | undefined
   */
  public getVideos(search: string | undefined): void {
    this.videos = [];
    this.loading = true;
    this.videoService.getVideos(search).subscribe(
      (res) => {
        this.videos = res;
        this.loading = false;
      },
      () => {
        this.loading = false;
      },
    );
  }

  public download(id: string) {
    this.videoService.getDownloadVideo(id);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
