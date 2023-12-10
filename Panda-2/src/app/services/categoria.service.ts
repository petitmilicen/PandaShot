import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BdserviceService } from './bdservice.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  database!: SQLiteObject;

  constructor(private databaseService: BdserviceService) {
    this.databaseService.initializeDatabase().then(() => {
      this.database = this.databaseService.database;
      this.crearTablas();  
      this.insertCategoriasConIds();
    });
   }

  isready: BehaviorSubject<boolean>= new BehaviorSubject(false);

  tablaCategoria = `
  CREATE TABLE IF NOT EXISTS categoria(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT
  );`;

  categoriasConIds = [
    { id: 1, nombre: 'Series' },
    { id: 2, nombre: 'Anime' },
    { id: 3, nombre: 'Videojuegos' },
    { id: 4, nombre: 'Musica' },
    { id: 5, nombre: 'Libros y Lectura' },
    { id: 6, nombre: 'Arte' },
    { id: 7, nombre: 'Deportes' },
    { id: 8, nombre: 'Ciencia y Tecnologia' }
  ];
  
  delete = `delete from categoria`

  async crearTablas() {
    try {
    await this.database.executeSql(
      this.tablaCategoria,
      []
    )
    
    this.isready.next(true);
    } catch (error) {
      console.error('Error al crear la tabla:', error);
    }
    
  }

  async insertCategoriasConIds() {
    let i: number = 0;
    for (const categoria of this.categoriasConIds) {
      await this.database.executeSql('INSERT OR IGNORE INTO Categoria (id, nombre) VALUES(?, ?);', [categoria.id, categoria.nombre]).then(res => {
        i++;
        if (i == this.categoriasConIds.length) {
          this.isready.next(true);
        }
      }, err => {
        console.error('Error al insertar categoría con ID:', err);
      });
    }
  }

  async getCategorias(): Promise<any[]> {
    return new Promise<any[]>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT *
              FROM Categoria
            `;
  
            const resultado = await this.database.executeSql(query, []);
  
            if (resultado.rows.length > 0) {
              const categorias = [];
  
              for (let i = 0; i < resultado.rows.length; i++) {
                const categoria = resultado.rows.item(i);
                categorias.push(categoria);
              }
  
              resolve(categorias);
            } else {
              resolve([]);
            }
          } catch (error) {
            console.error('Error al obtener las categorías:', error);
            reject(error);
          }
        }
      });
    });
  }
  

}
