import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarios: any[] = [];
  

  constructor(private router: Router,  private usuariosServicio: UsuariosService,private storage: Storage, private navCtrl: NavController) { 
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


}

