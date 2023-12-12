import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarios: any[] = [];
  

  constructor(private router: Router,  private usuariosServicio: UsuariosService,private storage: Storage, private alertController: AlertController) { 
    this.storage.create();
  }

  ngOnInit() {
    this.usuariosServicio.getUsuarios().then((usuarios) => {
      this.usuarios = usuarios;
  
      console.log('Datos de usuarios en la base de datos:');
      console.log(this.usuarios);
    })
    
  }

  user = { email: '', contrasena: '' };
  loginError = false;

  async iniciarSesion() {
    try {
      const { email, contrasena } = this.user;
      const user = await this.usuariosServicio.loginUser(email, contrasena);
      this.router.navigate(['tabs/imagenes'])
      
      
    } catch (error) {
      this.loginError = true;
      console.error(error);
    }
  }

  async mostrarAlertaOlvidoContrasena() {
    const alert = await this.alertController.create({
      header: 'Olvidé mi contraseña',
      inputs: [
        {
          name: 'correo',
          type: 'email',
          placeholder: 'Correo electrónico'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Enviar',
          handler: async (data) => {
            const correo = data.correo;
            await this.verificarCorreoYRedirigir(correo);
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async mostrarAlertaCorreoNoExistente() {
    const alert = await this.alertController.create({
      header: 'Correo no encontrado',
      message: 'El correo ingresado no existe. Por favor, verifique y vuelva a intentarlo.',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async mostrarAlertaVacia() {
    const alert = await this.alertController.create({
      header: 'Correo invalido',
      message: 'Ingresa un correo por favor.',
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  async verificarCorreoYRedirigir(correo: string) {
    try {
      if (!correo || correo.trim() === '') {
        await this.mostrarAlertaCorreoNoExistente();
        return;      
      }
  
      const id = await this.usuariosServicio.obtenerIdPorCorreo(correo);
      console.log(id);
      
  
      if (id !== null) {
        this.router.navigate(['/recuperar-contrasena', id]);
      } else {
        await this.mostrarAlertaCorreoNoExistente();
      }
    } catch (error) {
      console.error('Error al obtener el ID por correo:', error);
    }
  }
  
  
  
  
  

}

