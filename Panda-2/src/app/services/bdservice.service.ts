import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@awesome-cordova-plugins/sqlite/ngx"
@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  public database!: SQLiteObject;
  tablaImagen: string = "CREATE TABLE IF NOT EXISTS imagen(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(100) NOT NULL, imagen BLOB, descripcion VARCHAR(250), fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP)";
  

  constructor() { }
}
