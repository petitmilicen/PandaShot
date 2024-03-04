import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private storage: Storage, private usuarioService: UsuariosService, private router: Router, private toastController: ToastController) {
    this.storage.create();
  }

  usuario: any = {};

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const usuarioId = paramMap.get('usuarioId');
      this.cargarUsuario(Number(usuarioId));
    });
  }

  async cargarUsuario(id: number) {
    this.usuarioService.getUsuario(id).then((usuario) => {
      this.usuario = usuario;
      console.log('datos del usuario a editar',this.usuario);
    });
  }


  async editarUsuario() {
    try {
      await this.usuarioService.editUsuario(this.usuario.id, this.usuario.nombre, this.usuario.biografia);
      this.mostrarToastExito('Perfil actualizado con éxito');
      this.router.navigate([`/perfil/${this.usuario.id}`]);
    } catch (error) {
      console.error('Error al editar el usuario:', error);
      this.mostrarToastError('Hubo un error al editar el perfil. Por favor, inténtalo de nuevo.');
    }
  }
  
  async mostrarToastExito(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
    });
  
    await toast.present();
  }
  
  async mostrarToastError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'danger', 
    });
  
    await toast.present();
  }

}
