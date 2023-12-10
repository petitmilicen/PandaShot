import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagenesBaneadasPage } from './imagenes-baneadas.page';

const routes: Routes = [
  {
    path: '',
    component: ImagenesBaneadasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagenesBaneadasPageRoutingModule {}
