import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Imagen } from '../tab1/imagen.model';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {
  listaImagenes= new BehaviorSubject([]);
  private isready: BehaviorSubject<boolean>= new BehaviorSubject(false) ;
  alertController: any;

  public database!: SQLiteObject;
  imagenData: BehaviorSubject<Imagen[]> = new BehaviorSubject<Imagen[]>([]);


  tablaImagen: string = "CREATE TABLE IF NOT EXISTS imagen(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo VARCHAR(100) NOT NULL, imagen VARCHAR(250), descripcion VARCHAR(250), fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP)";

  private insertarImagen: string = `
  INSERT INTO imagen (titulo, imagen, descripcion)
  VALUES ('Bicho', 'https://cdn1.unitedinfocus.com/uploads/14/2022/04/GettyImages-1240307962-1024x683.jpg', 'El goat')
  `;


  constructor(private sqlite: SQLite, private platform: Platform) {
    this.createDatabase();

  }

  async createDatabase() {

      await this.sqlite.create({
        name: "datos.db",
        location: "default",
      })
      .then((db: SQLiteObject) => {      
        this.database = db;
      })
      .catch((e) => {
        alert("Error al crear base de datos" + JSON.stringify(e));
      });
      await this.crearTablas()
      await this.addImagen('Bicho', 'https://cdn1.unitedinfocus.com/uploads/14/2022/04/GettyImages-1240307962-1024x683.jpg', 'El goat');


  }

  async crearTablas() {
    try {
    await this.database.executeSql(
      this.tablaImagen,
      []
    );
    this.isready.next(true);
    console.log('Tabla creada con exito');
    } catch (error) {
      console.error('Error al crear la tabla:', error);
    }
    
  }

  dbState(){
    return this.isready.asObservable();
  }

  async addImagen( titulo: string, descripcion: string, imagen: string) {
    console.log('Insertando imagen: ', titulo, descripcion, imagen);
    
    return this.database
      .executeSql(
        'INSERT INTO imagen ( titulo, imagen, descripcion) VALUES (?,?,?)',
        [titulo, descripcion, imagen]
      ).then(() => {
        console.log('Imagen agregada con exito');
        this.isready.next(true);
      })
  }

  async getImagenes(): Promise<Imagen[]> {
    return new Promise<Imagen[]>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const imagenes = await this.database.executeSql('SELECT * FROM imagen', []);
            const items: Imagen[] = [];

            for (let i = 0; i < imagenes.rows.length; i++) {
              items.push(imagenes.rows.item(i));
            }

            resolve(items); 
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }

  async getImagen(id: number): Promise<Imagen | null> {
    return new Promise<Imagen | null>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const resultado = await this.database.executeSql('SELECT * FROM imagen WHERE id = ?', [id]);
            
            if (resultado.rows.length > 0) {
              const imagen: Imagen = resultado.rows.item(0);
              resolve(imagen);
            } else {
              resolve(null); 
            }
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }

  async deleteImagen(id: number) {
    return this.database
      .executeSql(`DELETE FROM imagen WHERE id = ${id}`, [])
      .then(() => {
        return "category deleted";
      })
      .catch((e) => {
        return "Error al borrar imagen " + JSON.stringify(e);  
      });
  }

  async editImagen(nombre: string, id: number) {
    return this.database
      .executeSql(
        `UPDATE imagen SET name = '${nombre}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "Imagen editada con exito";
      })

  }

}
