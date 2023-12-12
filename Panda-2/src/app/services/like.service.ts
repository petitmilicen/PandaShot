import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BdserviceService } from './bdservice.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  database!: SQLiteObject;
  

  constructor(private databaseService: BdserviceService) {
    this.databaseService.initializeDatabase().then(() => {
      this.database = this.databaseService.database;
      this.crearTablas();  
    });
   }

  isready: BehaviorSubject<boolean>= new BehaviorSubject(false);

  tablaLikes: string = `
  CREATE TABLE IF NOT EXISTS likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    imagen_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    FOREIGN KEY (imagen_id) REFERENCES imagen (id) ON DELETE CASCADE
  )`;

  delete = `DROP TABLE IF EXISTS likes;
  `

  async crearTablas() {
    try {
      
    await this.database.executeSql(
      this.tablaLikes,
      []
    )
    
    this.isready.next(true);
    } catch (error) {
      console.error('Error al crear la tabla:', error);
    }
  }

  async addLike(usuario_id: any, imagen_id: any): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              INSERT INTO likes (usuario_id, imagen_id)
              VALUES (?, ?)
            `;
  
            await this.database.executeSql(query, [usuario_id, imagen_id]);
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }
  

  async removeLike(usuario_id: any, imagen_id: any): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              DELETE FROM likes
              WHERE usuario_id = ? AND imagen_id = ?
            `;
  
            await this.database.executeSql(query, [usuario_id, imagen_id]);
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }
  

  async getLikes(imagen_id: any): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT COUNT(*) as cantidad_likes
              FROM likes
              WHERE imagen_id = ?
            `;
  
            const resultado = await this.database.executeSql(query, [imagen_id]);
  
            if (resultado.rows.length > 0) {
              const cantidadLikes = resultado.rows.item(0).cantidad_likes;
              resolve(cantidadLikes);
            } else {
              resolve(0);
            }
          } catch (error) {
            console.error('Error al obtener la cantidad de "likes" por imagen:', error);
            reject(error);
          }
        }
      });
    });
  }
  
  
  async hasLiked(usuario_id: any, imagen_id: any): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT *
              FROM likes
              WHERE usuario_id = ? AND imagen_id = ?
            `;
    
            const resultado = await this.database.executeSql(query, [usuario_id, imagen_id]);
    
            resolve(resultado.rows.length > 0);
          } catch (error) {
            console.error('Error al verificar si el usuario ha dado like:', error);
            reject(error);
          }
        }
      });
    });
  }

  async getAllLikes(): Promise<any[]> {
    return new Promise<any[]>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT * FROM likes
            `;

            const resultado = await this.database.executeSql(query, []);

            if (resultado.rows.length > 0) {
              const likes = [];
              for (let i = 0; i < resultado.rows.length; i++) {
                likes.push(resultado.rows.item(i));
              }
              resolve(likes);
            } else {
              resolve([]);
            }
          } catch (error) {
            console.error('Error al obtener todos los "likes":', error);
            reject(error);
          }
        }
      });
    });
  }
  

}
