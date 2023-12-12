import { Component, OnInit } from '@angular/core';
import { GuardadosService } from 'src/app/services/guardados.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-imagenes-guardadas',
  templateUrl: './imagenes-guardadas.page.html',
  styleUrls: ['./imagenes-guardadas.page.scss'],
})
export class ImagenesGuardadasPage implements OnInit {
  nombreUsuario: any;
  idUsuario!: any;
  isAdmin!: any;
  guardados: any;

  constructor(private guardadoServicio: GuardadosService, private usuarioService: UsuariosService, private storage: Storage, private alertController: AlertController) {
    this.storage.create();
   }

  ngOnInit() {
    console.log(this.idUsuario);
    this.cargarUsuarioData();
    this.cargarGuardados();
  }

  ionViewWillEnter() {
    console.log(this.idUsuario);
    
    this.cargarUsuarioData();
    this.cargarGuardados();

  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.cargarUsuarioData();
    this.cargarGuardados();
  }
  

  async cargarUsuarioData() {
    try {
      const currentUser = await this.usuarioService.getCurrentUser();
  
      if (currentUser) {
        this.nombreUsuario = currentUser.nombre;
        this.idUsuario = currentUser.idUsuario;
        this.isAdmin = currentUser.isAdmin;
        console.log(`Nombre usuario actual en storage: ${this.nombreUsuario} id: ${this.idUsuario} is_admin: ${this.isAdmin}`);
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario:', error);
    }
  }

  async cargarGuardados() {
    try {
      this.guardados = await this.guardadoServicio.getGuardadosPorUsuario(this.idUsuario);
      console.log('Guardados:', this.guardados);
    } catch (error) {
      console.error('Error al cargar los guardados:', error);
    }
  }

  async eliminarGuardado(usuario_id: any, imagen_id: any): Promise<void> {
    const confirmAlert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar este guardado?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.guardadoServicio.eliminarGuardado(usuario_id, imagen_id);
              this.cargarGuardados();
            } catch (error) {
              console.error('Error al eliminar el guardado:', error);
            }
          }
        }
      ]
    });
  
    await confirmAlert.present();
  }

}
