import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { BdserviceService } from './bdservice.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  database!: SQLiteObject;

  constructor(private databaseService: BdserviceService) {
    this.databaseService.initializeDatabase().then(() => {
      this.database = this.databaseService.database;
      this.crearTablas();  
    });
   }
   
  isready: BehaviorSubject<boolean>= new BehaviorSubject(false);

  tablaNotificaciones: string = `CREATE TABLE IF NOT EXISTS notificaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contenido TEXT,
    imagen_id INTEGER,
    usuario_id INTEGER,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    vista BOOLEAN DEFAULT 0,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
    FOREIGN KEY (imagen_id) REFERENCES imagen (id)
  )`;

  async crearTablas() {
    try {
      
    await this.database.executeSql(
      this.tablaNotificaciones,
      []
    )
    
    this.isready.next(true);
    } catch (error) {
      console.error('Error al crear la tabla:', error);
    }
    
  }

  async getCantidadNotificacionesPorUsuario(idUsuario: number): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT COUNT(*) as cantidad_notificaciones
              FROM notificaciones
              WHERE usuario_id = ?
            `;
  
            const resultado = await this.database.executeSql(query, [idUsuario]);
  
            if (resultado.rows.length > 0) {
              const cantidadNotificaciones = resultado.rows.item(0).cantidad_notificaciones;
              resolve(cantidadNotificaciones);
            } else {
              resolve(0);
            }
          } catch (error) {
            console.error('Error al obtener la cantidad de notificaciones por usuario:', error);
            reject(error);
          }
        }
      });
    });
  }

  async enviarNotificacionDeLike(imagenId: number, usuarioId: number, nombreUsuario: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
  
            const contenido = `${nombreUsuario} ha dado like a tu imagen.`;
  
            const query = `
              INSERT INTO notificaciones (contenido, imagen_id, usuario_id)
              VALUES (?, ?, ?)
            `;
  
            await this.database.executeSql(query, [contenido, imagenId, usuarioId]);
            resolve();
          } catch (error) {
            console.error('Error al enviar notificación de like:', error);
            reject(error);
          }
        }
      });
    });
  }

  async enviarNotificacionDeComentario(imagenId: number, usuarioId: number, nombreUsuario: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const contenido = `${nombreUsuario} ha comentado tu publicación.`;
  
            const query = `
              INSERT INTO notificaciones (contenido, imagen_id, usuario_id)
              VALUES (?, ?, ?)
            `;
  
            await this.database.executeSql(query, [contenido, imagenId, usuarioId]);
            resolve();
          } catch (error) {
            console.error('Error al enviar notificación de comentario:', error);
            reject(error);
          }
        }
      });
    });
  }
  
  
  
}
