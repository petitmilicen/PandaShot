import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { BdserviceService } from './bdservice.service';

@Injectable({ 
  providedIn: 'root'
})
export class ImagenService {
  database!: SQLiteObject;

  constructor(private databaseService: BdserviceService) {
    this.databaseService.initializeDatabase().then(() => {
      this.database = this.databaseService.database;
      this.crearTablas();  
    });
   }
   
  isready: BehaviorSubject<boolean>= new BehaviorSubject(false);

  tablaImagen: string = `CREATE TABLE IF NOT EXISTS imagen (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(255),
    descripcion VARCHAR(255), 
    imagen BLOB,
    fecha_publicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    disponible BOOLEAN DEFAULT 1,
    usuario_id INTEGER,
    categoria_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    FOREIGN KEY (categoria_id) REFERENCES categoria (id)
  )`;

  dropTableQuery = `DROP TABLE IF EXISTS imagen`;

  async crearTablas() {
    try {
      
    await this.database.executeSql(
      this.tablaImagen,
      []
    )
    
    this.isready.next(true);
    } catch (error) {
      console.error('Error al crear la tabla:', error);
    }
    
  }

  async addImagen(titulo: string, imagen: string, descripcion: string, usuarioId: number, categoriaId: number) {
    console.log('Insertando imagen: ', titulo, imagen, descripcion, categoriaId);
  
    try {
      await this.database.executeSql(
        'INSERT INTO imagen (titulo, imagen, descripcion, usuario_id, categoria_id) VALUES (?,?,?,?,?)',
        [titulo, imagen, descripcion, usuarioId, categoriaId]
      );
  
      console.log('Imagen agregada con éxito');
      this.isready.next(true);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
  }
  

  async getImagenes(): Promise<any[]> {
    return new Promise<any[]>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const queryJoin = `
              SELECT imagen.*, usuarios.nombre AS nombre_usuario,
              (SELECT COUNT(*) FROM likes WHERE likes.imagen_id = imagen.id) AS cantidad_likes
              FROM imagen
              INNER JOIN usuarios ON imagen.usuario_id = usuarios.id
              WHERE imagen.disponible = 1
              ORDER BY imagen.fecha_publicacion DESC
            `;

            const imagenes = await this.database.executeSql(queryJoin, []);
            const items: any[] = [];

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


  async getImagen(id: number): Promise<any | null> {
    return new Promise<any | null>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const resultado = await this.database.executeSql(` 
              SELECT imagen.*, usuarios.nombre AS nombre_usuario, categoria.nombre AS nombre_categoria
              FROM imagen
              INNER JOIN usuarios ON imagen.usuario_id = usuarios.id
              INNER JOIN categoria ON imagen.categoria_id = categoria.id
              WHERE imagen.id = ?
              ORDER BY imagen.fecha_publicacion DESC;`, [id]);
  
            if (resultado.rows.length > 0) {
              const imagen: any = resultado.rows.item(0);
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

  async editImagen(titulo: string, imagen: string, descripcion: string, id: number) {
    try {
      await this.database.executeSql(
        `UPDATE imagen SET titulo = ?, imagen = ?, descripcion = ? WHERE id = ?`,
        [titulo, imagen, descripcion, id]
      );
      console.log(titulo, imagen, descripcion, id);
      
      return "Imagen editada con éxito";
    } catch (error) {
      console.error('Error al editar la imagen:', error);
      throw error;
    }
  }

  async searchImagenes(terminoBusqueda: string): Promise<any[]> {
    return new Promise<any[]>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT imagen.*, usuarios.nombre AS nombre_usuario
              FROM imagen
              INNER JOIN usuarios ON imagen.usuario_id = usuarios.id
              WHERE imagen.titulo LIKE ?
              ORDER BY imagen.fecha_publicacion DESC
            `;
            const parametros = [`%${terminoBusqueda}%`];
  
            const imagenes = await this.database.executeSql(query, parametros);
            const items: any[] = [];
  
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

  async getImagenesByUsuarioId(usuarioId: number): Promise<any[]> {
    return new Promise<any[]>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT imagen.*
              FROM imagen
              INNER JOIN usuarios ON imagen.usuario_id = usuarios.id
              WHERE imagen.usuario_id = ?
              ORDER BY imagen.fecha_publicacion DESC
            `;
            const parametros = [usuarioId];
  
            const imagenes = await this.database.executeSql(query, parametros);
            const items: any[] = [];
  
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

  async banearImagen(id: number): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        await this.database.executeSql(
          `UPDATE imagen SET disponible = 0 WHERE id = ?`,
          [id]
        );
        
        console.log(`Imagen con ID ${id} ha sido deshabilitada (baneada).`);
        resolve("Imagen deshabilitada con éxito");
      } catch (error) {
        console.error('Error al deshabilitar la imagen:', error);
        reject(error);
      }
    });
  }

  async getCantidadImagenesPorId(usuarioId: number): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT COUNT(*) as cantidad
              FROM imagen
              WHERE usuario_id = ? AND disponible = 1
            `;
            const parametros = [usuarioId];
  
            const resultado = await this.database.executeSql(query, parametros);
            const cantidad = resultado.rows.item(0).cantidad;
  
            resolve(cantidad);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }

  async getImagenesBaneadas(): Promise<any[]> {
    return new Promise<any[]>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT imagen.*, usuarios.nombre AS nombre_usuario
              FROM imagen
              INNER JOIN usuarios ON imagen.usuario_id = usuarios.id
              WHERE imagen.disponible = 0
              ORDER BY imagen.fecha_publicacion DESC
            `;
    
            const imagenes = await this.database.executeSql(query, []);
            const items: any[] = [];
    
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

  async habilitarImagen(idImagen: number): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.database.executeSql(
          `UPDATE imagen SET disponible = 1 WHERE id = ?`,
          [idImagen]
        );
        
        resolve();
      } catch (error) {
        console.error('Error al habilitar la imagen:', error);
        reject(error);
      }
    });
  }
  
  
}
