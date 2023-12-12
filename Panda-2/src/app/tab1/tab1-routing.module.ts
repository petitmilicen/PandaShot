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
    loadChildren: () => import('./agregar-imagen/agregar-imagen.module').then( m => m.AgregarImagenPageModule),

  },
  {
    path: 'editar-imagen',
    loadChildren: () => import('./editar-imagen/editar-imagen.module').then( m => m.EditarImagenPageModule)
  },
  {
    path: 'imagenes-baneadas',
    loadChildren: () => import('./imagenes-baneadas/imagenes-baneadas.module').then( m => m.ImagenesBaneadasPageModule)
  },
  {
    path: 'imagenes-guardadas',
    loadChildren: () => import('./imagenes-guardadas/imagenes-guardadas.module').then( m => m.ImagenesGuardadasPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
