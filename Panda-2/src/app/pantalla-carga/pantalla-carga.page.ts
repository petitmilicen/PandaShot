import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pantalla-carga',
  templateUrl: './pantalla-carga.page.html',
  styleUrls: ['./pantalla-carga.page.scss'],
})
export class PantallaCargaPage implements OnInit {

  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigate(['tabs/imagenes']);
    }, 2000);

   }

  ngOnInit() {

  }

}
