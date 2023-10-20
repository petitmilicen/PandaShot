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

  async ngOnInit() {
    this.usuariosServicio.getUsuarios().then((usuarios) => {
      this.usuarios = usuarios;
  
      console.log('Datos de usuarios en la base de datos:');
      console.log(this.usuarios);
  
    })

  }

  nombreValido = true;
  correoExiste = true;
  contrasenaValida = true;
  correoValido = true;
  nombreUsuarioValido = true;
  contrasenasCoinciden = true;
  edadValida = true;

  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  edad!: number;


  async registrarUsuario() {

    const nombre = this.nombre;
    const contrasena = this.contrasena;
    const confirmarContrasena = this.confirmarContrasena;
    const correo = this.correo;
    const edad = this.edad;
    const edadMinima = 16;

  
    if (nombre.length < 3) {
      this.nombreValido = false;
      return
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
      this.contrasenaValida = false
      return
    }

    if (contrasena !== confirmarContrasena) {
      this.contrasenasCoinciden = false;
      return;
    }
  
    if (edad < edadMinima) {
      this.edadValida = false;
    }
  
    try {
      await this.usuariosServicio.registerUser(nombre, contrasena, correo, edad);
      console.log('Usuario registrado: '+ nombre, contrasena, correo, edad);
      this.router.navigate(['/login']);
      
    } catch (error) {
      throw error;
    }
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
  
  validarEdad() {
    const edadMinima = 16;
    const edad = this.edad;

    if (edad < edadMinima) {
      this.edadValida = false;
    } else {
      this.edadValida = true;
    }
  }

  
}
