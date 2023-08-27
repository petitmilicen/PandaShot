import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'imagen-detalle',
    loadChildren: () => import('./imagen-detalle/imagen-detalle.module').then( m => m.ImagenDetallePageModule)
  },
  {
    path: 'agregar-imagen',
    loadChildren: () => import('./agregar-imagen/agregar-imagen.module').then( m => m.AgregarImagenPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
