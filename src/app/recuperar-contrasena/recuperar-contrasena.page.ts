import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {

  preguntaSeguridad: any;
  usuario: any;
  respuesta: any;

  constructor(private router: Router, private usuarioService: UsuariosService, private activatedRoute: ActivatedRoute, private alertController: AlertController, private toastController: ToastController) { }



  ngOnInit() {
    this.cargarDatos();
  }

  ionViewWillEnter(){
    this.cargarDatos();
  }

  async cargarUsuario(id: number) {
    this.usuarioService.getUsuario(id).then((usuario) => {
      this.usuario = usuario;
      this.preguntaSeguridad = usuario.pregunta_seguridad; 
    });
    console.log(this.usuario);
    
  }

  async cargarDatos() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      const usuarioIdPerfil = paramMap.get('usuarioId');
      this.cargarUsuario(Number(usuarioIdPerfil));
    });
  }

  async verificarRespuestas() {
    const respuestaUsuario = this.respuesta;

    if (respuestaUsuario === this.usuario.respuesta_seguridad) {
      await this.mostrarAlertaCambiarContrasena();
    } else {
      await this.mostrarAlertaRespuestaIncorrecta();
    }
  }

  async mostrarToastExito() {
    const toast = await this.toastController.create({
      message: 'Contraseña cambiada con éxito',
      duration: 2000,
      position: 'bottom', 
    });
  
    await toast.present();
  }

  async mostrarAlertaCambiarContrasena() {
    const alert = await this.alertController.create({
      header: 'Cambiar Contraseña',
      message: 'Ingresa la nueva contraseña',
      inputs: [
        {
          name: 'nuevaContrasena',
          type: 'password',
          placeholder: 'Nueva Contraseña',
        },
        {
          name: 'confirmarContrasena',
          type: 'password',
          placeholder: 'Confirmar Contraseña',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: async (data: any) => {
            const nuevaContrasena = data.nuevaContrasena;
            const confirmarContrasena = data.confirmarContrasena;
  
            if (this.validarContrasenas(nuevaContrasena, confirmarContrasena)) {
              await this.usuarioService.cambiarContrasena(this.usuario.id, nuevaContrasena);
              console.log('Contraseña cambiada:', nuevaContrasena);
              this.mostrarToastExito();
              this.router.navigate(['/login']);
            } else {
              console.error('Las contraseñas no coinciden');
              this.mostrarAlertaContrasenasNoCoinciden();
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  async mostrarAlertaContrasenasNoCoinciden() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.',
      buttons: ['OK'],
    });
  
    await alert.present();
  }
  
  validarContrasenas(contrasena: string, confirmarContrasena: string): boolean {

    return contrasena.trim() !== '' && contrasena === confirmarContrasena;
  }
  

  async mostrarAlertaRespuestaIncorrecta() {
    const alert = await this.alertController.create({
      header: 'Respuesta Incorrecta',
      message: 'La respuesta proporcionada no es correcta. Por favor, inténtalo de nuevo.',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
