import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { BdserviceService } from './bdservice.service';

@Injectable({
  providedIn: 'root'
})
export class GuardadosService {

  database!: SQLiteObject;

  constructor(private databaseService: BdserviceService) {
    this.databaseService.initializeDatabase().then(() => {
      this.database = this.databaseService.database;
      this.crearTablas();  
    });
   }

  isready: BehaviorSubject<boolean>= new BehaviorSubject(false);

  tablaGuardados: string = `
  CREATE TABLE IF NOT EXISTS guardados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    imagen_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    FOREIGN KEY (imagen_id) REFERENCES imagen (id) ON DELETE CASCADE
  )`;

  drop = `drop table guardados`

  async crearTablas() {
    try {
      
    await this.database.executeSql(
      this.tablaGuardados,
      []
    )
    
    this.isready.next(true);
    } catch (error) {
      console.error('Error al crear la tabla:', error);
    }
  }

  async addGuardado(usuario_id: any, imagen_id: any): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              INSERT INTO guardados (usuario_id, imagen_id)
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

  async removeGuardado(usuario_id: any, imagen_id: any): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              DELETE FROM guardados
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

  async getGuardados(imagen_id: any): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT COUNT(*) as cantidad_guardados
              FROM guardados
              WHERE imagen_id = ?
            `;
    
            const resultado = await this.database.executeSql(query, [imagen_id]);
    
            if (resultado.rows.length > 0) {
              const cantidadGuardados = resultado.rows.item(0).cantidad_guardados;
              resolve(cantidadGuardados);
            } else {
              resolve(0);
            }
          } catch (error) {
            console.error('Error al obtener la cantidad de "guardados" por imagen:', error);
            reject(error);
          }
        }
      });
    });
  }
  

  async hasGuardado(usuario_id: any, imagen_id: any): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT *
              FROM guardados
              WHERE usuario_id = ? AND imagen_id = ?
            `;
    
            const resultado = await this.database.executeSql(query, [usuario_id, imagen_id]);
    
            resolve(resultado.rows.length > 0);
          } catch (error) {
            console.error('Error al verificar si el usuario ha guardado:', error);
            reject(error);
          }
        }
      });
    });
  }

  async getGuardadosPorUsuario(usuario_id: any): Promise<any[]> {
    return new Promise<any[]>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              SELECT guardados.*, imagen.*, usuarios.nombre AS nombre_usuario_imagen
              FROM guardados
              INNER JOIN imagen ON guardados.imagen_id = imagen.id
              INNER JOIN usuarios ON imagen.usuario_id = usuarios.id
              WHERE guardados.usuario_id = ?
            `;
  
            const resultado = await this.database.executeSql(query, [usuario_id]);
  
            if (resultado.rows.length > 0) {
              const guardados = [];
              for (let i = 0; i < resultado.rows.length; i++) {
                guardados.push(resultado.rows.item(i));
              }
              resolve(guardados);
            } else {
              resolve([]);
            }
          } catch (error) {
            console.error('Error al obtener los guardados por usuario:', error);
            reject(error);
          }
        }
      });
    });
  }  

  async eliminarGuardado(usuario_id: any, imagen_id: any): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              DELETE FROM guardados
              WHERE usuario_id = ? AND imagen_id = ?
            `;
  
            await this.database.executeSql(query, [usuario_id, imagen_id]);
            resolve();
          } catch (error) {
            console.error('Error al eliminar el guardado:', error);
            reject(error);
          }
        }
      });
    });
  }
  
  
}
