import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Subject } from 'rxjs';
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
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    vista BOOLEAN DEFAULT 0,
    imagen_id INTEGER,
    usuario_id INTEGER,
    usuario_interactuante_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
    FOREIGN KEY (imagen_id) REFERENCES imagen (id),
    FOREIGN KEY (usuario_interactuante_id) REFERENCES usuarios(id)
  )`;

  drop = `drop table notificaciones`
  alter = `delete from notificaciones`

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
  
  async getCantidadNotificacionesNoVistasPorId(idUsuario: number): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT COUNT(*) as cantidad_notificaciones
              FROM notificaciones
              WHERE usuario_id = ? AND vista = 0
              ORDER BY fecha_creacion DESC
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
  

async getNotificacionesPorId(usuarioId: number): Promise<any[]> {
  return new Promise<any[]>(async (resolve, reject) => {
    this.isready.subscribe(async (ready) => {
      if (ready) {
        try {
          const query = `
            SELECT 
            
              notificacion.*, 
              usuario.nombre AS nombre_usuario, 
              interactuante.foto_perfil AS foto_perfil_interactuante,
              imagen.descripcion AS descripcion_imagen,
              imagen.imagen AS imagen_imagen

            FROM notificaciones notificacion
            JOIN usuarios usuario ON notificacion.usuario_id = usuario.id
            LEFT JOIN imagen ON notificacion.imagen_id = imagen.id
            LEFT JOIN usuarios interactuante ON notificacion.usuario_interactuante_id = interactuante.id
            WHERE notificacion.usuario_id = ? AND notificacion.vista = 0
            ORDER BY notificacion.fecha_creacion DESC
          `;

          const resultado = await this.database.executeSql(query, [usuarioId]);
          const notificaciones = [];

          for (let i = 0; i < resultado.rows.length; i++) {
            const notificacion = resultado.rows.item(i);
            notificaciones.push(notificacion);
          }

          resolve(notificaciones);
        } catch (error) {
          console.error('Error al obtener notificaciones por usuario:', error);
          reject(error);
        }
      }
    });
  });
}

  

  async enviarNotificacionDeLike(imagenId: number, usuarioInteractuanteId: number, idUsuario: number): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
  
            const queryNombreUsuario = `
              SELECT nombre FROM usuarios WHERE id = ?
            `;
            const resultadoNombreUsuario = await this.database.executeSql(queryNombreUsuario, [usuarioInteractuanteId]);
  
            if (resultadoNombreUsuario.rows.length > 0) {
              const nombreUsuarioInteractuante = resultadoNombreUsuario.rows.item(0).nombre;
  
              const contenido = `${nombreUsuarioInteractuante} ha dado like a tu imagen.`;
  
              const queryInsertarNotificacion = `
                INSERT INTO notificaciones (contenido, imagen_id, usuario_id, usuario_interactuante_id)
                VALUES (?, ?, ?, ?)
              `;
  
              await this.database.executeSql(queryInsertarNotificacion, [contenido, imagenId, idUsuario, usuarioInteractuanteId]);
              console.log(contenido, 'En la imagen con id', imagenId, 'del usuario con con id', usuarioInteractuanteId);
  
              resolve();
            } else {
              reject('No se encontró el nombre del usuario interactuante.');
            }
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
  
  async getNotificaciones(): Promise<any[]> {
    return new Promise<any[]>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT *
              FROM notificaciones
            `;

            const resultado = await this.database.executeSql(query, []);

            const notificaciones: any[] = [];

            for (let i = 0; i < resultado.rows.length; i++) {
              const notificacion = resultado.rows.item(i);
              notificaciones.push(notificacion);
            }

            resolve(notificaciones);
          } catch (error) {
            console.error('Error al obtener las notificaciones:', error);
            reject(error);
          }
        }
      });
    });
  }

  async existeNotificacionDeLike(imagenId: number, usuarioInteractuanteId: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT COUNT(*) as cantidad
              FROM notificaciones
              WHERE imagen_id = ? AND usuario_interactuante_id = ?
            `;
  
            const resultado = await this.database.executeSql(query, [imagenId, usuarioInteractuanteId]);
  
            if (resultado.rows.length > 0) {
              const cantidad = resultado.rows.item(0).cantidad;
              resolve(cantidad > 0);
            } else {
              resolve(false);
            }
          } catch (error) {
            console.error('Error al verificar si existe la notificación de like:', error);
            reject(error);
          }
        }
      });
    });
  }
  
  
  
}
