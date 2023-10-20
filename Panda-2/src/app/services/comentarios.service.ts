import { Injectable } from '@angular/core';
import { BdserviceService } from './bdservice.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  database!: SQLiteObject;

  constructor(private databaseService: BdserviceService) {
    this.databaseService.initializeDatabase().then(() => {
      this.database = this.databaseService.database;
      this.crearTablas();  
    });
   }

  isready: BehaviorSubject<boolean>= new BehaviorSubject(false);

  tablaComentario = `
  CREATE TABLE IF NOT EXISTS comentario(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    usuario_id INTEGER,
    imagen_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    FOREIGN KEY (imagen_id) REFERENCES imagen(id)
  );`;

  insert = `INSERT INTO comentario (texto, usuario_id, imagen_id)
  VALUES ('Hola mundo xd', 1, 1);
  `

  async insertComentario(){
    try {
      await this.database.executeSql(this.insert);
      this.isready.next(true);
    } catch (error) {
      console.error('Error al crear la tabla de comentarios:', error);
    }
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaComentario, []);
      this.isready.next(true);
    } catch (error) {
      console.error('Error al crear la tabla de comentarios:', error);
    }
  }

  async agregarComentario(texto: string, usuario_id: any, imagen_id: any) {
    try {
      const query = `
        INSERT INTO comentario (texto, usuario_id, imagen_id)
        VALUES (?, ?, ?)
      `;

      await this.database.executeSql(query, [texto, usuario_id, imagen_id]);

      console.log('Comentario con imagen agregado con éxito');
    } catch (error) {
      console.error('Error al agregar el comentario con imagen:', error);
    }
  }

  async eliminarComentario(id: any) {
    try {
      const query = `
        DELETE FROM comentario
        WHERE id = ?
      `;

      await this.database.executeSql(query, [id]);

      console.log('Comentario con imagen eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar el comentario con imagen:', error);
    }
  }

  async editarComentario(id: any, nuevoTexto: string) {
    try {
      const query = `
        UPDATE comentario
        SET texto = ?
        WHERE id = ?
      `;

      await this.database.executeSql(query, [nuevoTexto, id]);

      console.log('Comentario con imagen editado con éxito');
    } catch (error) {
      console.error('Error al editar el comentario con imagen:', error);
    }
  }

  async getComentariosPorImagen(imagen_id: any): Promise<any[]> {

    
    return new Promise<any[]>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
            SELECT
            comentario.*,
            usuarios.nombre AS nombre_usuario,
            usuarios.foto_perfil AS foto_usuario
            FROM comentario
            JOIN usuarios ON comentario.usuario_id = usuarios.id
            WHERE comentario.imagen_id = ?
            ORDER BY comentario.fecha_creacion DESC;
            `;
    
            const resultado = await this.database.executeSql(query, [imagen_id]);
            const comentarios: any[] = [];
    
            for (let i = 0; i < resultado.rows.length; i++) {
              comentarios.push(resultado.rows.item(i));
            }
    
            resolve(comentarios);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }
  

}






