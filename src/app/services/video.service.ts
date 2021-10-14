import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private httpClient: HttpClient, private socket: Socket) {}

  getVideos(search?: string): Observable<any> {
    return this.httpClient
      .get(`${environment.webService}/video`, {
        params: { search: search || '' },
      })
      .pipe(
        map((videos: any) => {
          return videos.map((item: any) => {
            item.video = `${environment.webService}/${item.video}`;
            return item;
          });
        }),
      );
  }

  getVideo(id: string): Observable<any> {
    return this.httpClient.get(`${environment.webService}/video/detail/${id}`).pipe(
      map((video: any) => {
        video.video = `${environment.webService}/${video.video}`;
        return video;
      }),
    );
  }

  getDownloadVideo(id: string): Observable<any> {
    const url = `${environment.webService}/video/download/${id}`;
    window.open(url, "_blank");
    return this.httpClient.get(url) ;
  }

  postNewVideo(formData: FormData): Observable<any> {
    return this.httpClient.post(`${environment.webService}/video/create`, formData);
  }

  sendLike(id: string, type: 'likes' | 'dislikes'): void {
    this.socket.emit('like', { id, type });
  }

  getLike(id: string): Observable<any> {
    return this.socket.fromEvent(`like_response_${id}`);
  }
}
