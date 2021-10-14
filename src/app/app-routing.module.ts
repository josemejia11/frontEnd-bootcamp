import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((i) => i.DashboardModule),
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('./modules/video-form/video-form.module').then((i) => i.VideoFormModule),
  },
  {
    path: 'video',
    loadChildren: () =>
      import('./modules/video-detail/video-detail.module').then((i) => i.VideoDetailModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
