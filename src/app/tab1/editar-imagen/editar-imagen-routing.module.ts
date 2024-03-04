import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarImagenPage } from './editar-imagen.page';

const routes: Routes = [
  {
    path: '',
    component: EditarImagenPage,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarImagenPageRoutingModule {}
