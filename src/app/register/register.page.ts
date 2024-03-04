import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private usuariosServicio: UsuariosService, private storage: Storage) { }

  usuarios: any[] = [];
  fechaNacimientoTexto!: string;

  preguntasPredeterminadas = [
    '¿Cuál es el nombre de tu primera mascota?',
    '¿En qué ciudad naciste?'
  ];

  async ngOnInit() {
    this.usuariosServicio.getUsuarios().then((usuarios) => {
      this.usuarios = usuarios;

      console.log('Datos de usuarios en la base de datos:');
      console.log(this.usuarios);
    });
  }

  preguntaSeguridadValida = true;
  respuestaSeguridadValida = true;

  nombreValido = true;
  correoExiste = true;
  contrasenaValida = true;
  correoValido = true;
  nombreUsuarioValido = true;
  contrasenasCoinciden = true;
  edadValida = true;

  nombre: any = '';
  correo: any = '';
  contrasena: any = '';
  confirmarContrasena: any = '';
  fechaNacimiento!: any;
  respuestaSeguridad = '';
  preguntaSeguridad = this.preguntasPredeterminadas[0];

  async registrarUsuario() {
    const nombre = this.nombre;
    const contrasena = this.contrasena;
    const confirmarContrasena = this.confirmarContrasena;
    const correo = this.correo;
    const fechaNacimiento = this.fechaNacimiento;
    const edadMinima = 16;
    
    const fechaNacimientoDate = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimientoDate.getFullYear();

    if (nombre.length < 3) {
      this.nombreValido = false;
      return;
    }

    const nombreExiste = await this.usuariosServicio.nombreExiste(nombre);
    if (nombreExiste) {
      this.nombreUsuarioValido = false;
      return;
    }

    const correoExiste = await this.usuariosServicio.correoExiste(correo);
    if (correoExiste) {
      this.correoExiste = false;
      return;
    }

    const correoValido = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(correo);
    if (!correoValido) {
      this.correoValido = false;
      return;
    }

    if (!/\d/.test(contrasena) || contrasena.length < 6) {
      this.contrasenaValida = false;
      return;
    }

    if (contrasena !== confirmarContrasena) {
      this.contrasenasCoinciden = false;
      return;
    }

    if (edad < edadMinima) {
      this.edadValida = false;
      return;
    }

    if (isNaN(edad)) {
      this.validarFechaNacimiento();
      return;
    }

    if (!this.preguntaSeguridad || this.preguntasPredeterminadas.indexOf(this.preguntaSeguridad) === -1) {
      this.preguntaSeguridadValida = false;
      return;
    }
  
    if (!this.respuestaSeguridad || this.respuestaSeguridad.trim().length === 0) {
      this.respuestaSeguridadValida = false;
      return;
    }

    try {
      await this.usuariosServicio.registerUser(nombre, contrasena, correo, edad, this.preguntaSeguridad, this.respuestaSeguridad);
      console.log('Usuario registrado: ' + nombre, contrasena, correo, edad);
      this.router.navigate(['/login']);
    } catch (error) {
      throw error;
    }
  }

  validarFechaNacimiento() {
    const fechaNacimiento = new Date(this.fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    this.edadValida = edad >= 16;
    console.log(edad);
    
  }

  validarNombre() {
    const nombre = this.nombre;
    if (nombre.length >= 3) {
      this.nombreValido = true;

      this.usuariosServicio.nombreExiste(nombre).then((nombreExiste) => {
        this.nombreUsuarioValido = !nombreExiste;
      });
    } else {
      this.nombreValido = false;
      this.nombreUsuarioValido = false;
    }
  }
    

  validarCorreo() {
    const correo = this.correo;
    const correoValido = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
      correo
    );
    this.correoValido = correoValido;
  
    if (correoValido) {
      this.usuariosServicio.correoExiste(correo).then((correoExiste) => {
        this.correoExiste = !correoExiste;
      });
    }
  }
  
  validarContrasena() {
    const contrasena = this.contrasena;
    if (!/\d/.test(contrasena) || contrasena.length < 6) {
      this.contrasenaValida = false;
    } else {
      this.contrasenaValida = true;
    }
  }
  
  validarConfirmarContrasena() {
    const contrasena = this.contrasena;
    const confirmarContrasena = this.confirmarContrasena;
    if (contrasena !== confirmarContrasena) {
      this.contrasenasCoinciden = false;
    } else {
      this.contrasenasCoinciden = true;
    }
  }

  validarPreguntaSeguridad() {
    this.preguntaSeguridadValida = !!this.preguntaSeguridad;
  }
  
  validarRespuestaSeguridad() {
    this.respuestaSeguridadValida = !!this.respuestaSeguridad && this.respuestaSeguridad.trim().length > 0;
  }
  

  
}
