import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NotificacionesService } from '../services/notificaciones.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  usuarioLogueado: any;
  idUsuario: any;
  isAdmin: any;

  notificaciones: any[] = [];

  constructor(private storage: Storage, private notificacionServicio: NotificacionesService, private usuarioService: UsuariosService) {
    this.storage.create();
    
  }

  async ngOnInit() {
    await this.cargarUsuarioData();
    await this.cargarNotificaciones();
  }
  
  async ionViewWillEnter() {
    await this.cargarUsuarioData();
    await this.cargarNotificaciones();
  }

  
  async cargarUsuarioData() {
    try {
      const currentUser = await this.usuarioService.getCurrentUser();
      if (currentUser) {
        this.usuarioLogueado = currentUser.nombre;
        this.idUsuario = currentUser.idUsuario;
        this.isAdmin = currentUser.isAdmin;
        console.log(`Id usuario actual: ${this.idUsuario} Nombre usuario actual ${this.usuarioLogueado}`);
      }
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    }
  }
  
  async cargarNotificaciones() {
    try {
      const notificaciones = await this.notificacionServicio.getNotificacionesPorId(this.idUsuario);
      this.notificaciones = notificaciones;
      console.log('Datos de las notificaciones en la base de datos:');
      console.log(this.notificaciones);
    } catch (error) {
      console.error('Error al cargar notificaciones:', error);
    }
  }
  
}