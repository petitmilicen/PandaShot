import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';

import { BdserviceService } from './bdservice.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private storage: Storage, private databaseService: BdserviceService) {
    this.databaseService.initializeDatabase().then(() => {
      this.database = this.databaseService.database;
      this.crearTablas();
      this.insertInicial();
    })   
   }

  database!: SQLiteObject;
  isready: BehaviorSubject<boolean> = new BehaviorSubject(false);

  tablaUsuarios = `CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(255),
    correo VARCHAR(255),
    contrasena VARCHAR(255),
    foto_perfil BLOB,
    biografia TEXT,
    is_admin BOOLEAN,
    edad INTEGER,
    pregunta_seguridad VARCHAR(255),
    respuesta_seguridad VARCHAR(255),
    fecha_unio DATETIME DEFAULT CURRENT_TIMESTAMP
  );`

  insertDiego = `
  INSERT INTO usuarios (id, nombre, correo, contrasena, edad, foto_perfil, biografia, is_admin, pregunta_seguridad, respuesta_seguridad)
  SELECT 1, 'Diego', 'die.venegas@duocuc.cl', 'asd123', 21, NULL, 'Hola', 1, '¿En qué ciudad naciste?', 'Santiago'
  WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE id = 1);
  `;

  async crearTablas() {
    try {
    await this.database.executeSql(
      this.tablaUsuarios,
      []
    )
    
    this.isready.next(true);
    } catch (error) {
      console.error('Error al crear la tabla:', error);
    }
    
  }

  async insertInicial(){
    try {
      await this.database.executeSql(
        this.insertDiego,
        []
      )
      
      this.isready.next(true);
      } catch (error) {
        console.error('Error al insertar datos :', error);
      }

  }

async registerUser(nombre: string, contrasena: string, correo: string, edad: any, pregunta: string, respuesta: string) {
  try {
    const resultado = await this.database.executeSql(
      'INSERT INTO usuarios (nombre, contrasena, correo, edad, pregunta_seguridad, respuesta_seguridad) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, contrasena, correo, edad, pregunta, respuesta]
    );


  } catch (error) {
    throw error;
  }
}


  async loginUser(correo: string, password: string) {
    try {
      const userResult = await this.database.executeSql(
        'SELECT * FROM usuarios WHERE correo = ?',
        [correo]
      );
  
      if (userResult.rows.length > 0) {
        const user = userResult.rows.item(0);
  
        if (user.contrasena === password) {

          const currentUser = {nombre: user.nombre, idUsuario: user.id, isAdmin: user.is_admin};
          
          await this.storage.set('currentUser', currentUser);
        } else {
          throw new Error("Contraseña incorrecta.");
        }
      } else {
        throw new Error("Correo electrónico no encontrado.");
      }
    } catch (error) {
      throw error;
    }
  }

  async correoExiste(correo: string): Promise<boolean> {
    try {
      const resultado = await this.database.executeSql(
        'SELECT COUNT(*) AS cantidad FROM usuarios WHERE correo = ?',
        [correo]
      );
  
      if (resultado.rows.length > 0) {
        const cantidad = resultado.rows.item(0).cantidad;
        return cantidad > 0;
      }
  
      return false;
    } catch (error) {
      throw error;
    }
  }
  
  async nombreExiste(nombre: string): Promise<boolean> {
    try {
      const resultado = await this.database.executeSql(
        'SELECT COUNT(*) AS cantidad FROM usuarios WHERE nombre = ?',
        [nombre]
      );
  
      if (resultado.rows.length > 0) {
        const cantidad = resultado.rows.item(0).cantidad;
        return cantidad > 0;
      }
  
      return false;
    } catch (error) {
      throw error;
    }
  }  

  async getCurrentUser() {
    return await this.storage.get('currentUser');
    
  }

  async logoutUser() {
    await this.storage.remove('currentUser');
    
  }
    
  async getUsuarios(): Promise<any[]> {
    return new Promise<any[]>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const resultado = await this.database.executeSql('SELECT * FROM usuarios', []);
            const items: any[] = [];

            for (let i = 0; i < resultado.rows.length; i++) {
              items.push(resultado.rows.item(i));
            }

            resolve(items); 
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }
  
  async getUsuario(id: number): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const resultado = await this.database.executeSql('SELECT * FROM usuarios WHERE id = ?', [id]);
  
            if (resultado.rows.length > 0) {
              resolve(resultado.rows.item(0));
            } else {
              reject('Usuario no encontrado');
            }
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }

  async editUsuario(id: any, nuevoNombre: string, nuevabiografia: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              UPDATE usuarios
              SET nombre = ?,
              biografia = ?
              WHERE id = ?
            `;
  
            await this.database.executeSql(query, [nuevoNombre, nuevabiografia, id]);
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }
  

  async editUsuarioImagen(id: any, nuevaImagen: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.isready.subscribe(async (ready) => {
        if (ready) {
          try {
            const query = `
              UPDATE usuarios
              SET foto_perfil = ?
              WHERE id = ?
            `;
  
            await this.database.executeSql(query, [nuevaImagen, id]);
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }

  async obtenerIdPorCorreo(correo: string): Promise<number | null> {
    try {
    const resultado = await this.database.executeSql('SELECT id FROM usuarios WHERE correo = ?', [correo]);

    if (resultado.rows.length > 0) {
      return resultado.rows.item(0).id;
    }

    return null;
  } catch (error) {
    console.error('Error al obtener el ID por correo:', error);
    throw error;
  }
}

async cambiarContrasena(id: number, nuevaContrasena: string): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    this.isready.subscribe(async (ready) => {
      if (ready) {
        try {
          const query = `
            UPDATE usuarios
            SET contrasena = ?
            WHERE id = ?
          `;

          await this.database.executeSql(query, [nuevaContrasena, id]);
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    });
  });
}


  
  
}
