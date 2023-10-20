import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {
  database!: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.initializeDatabase();
  }

  async initializeDatabase(): Promise<void> {
    try {
      this.database = await this.sqlite.create({
        name: "database.db",
        location: "default",
      });
    } catch (error) {
      alert("Error al crear base de datos: " + JSON.stringify(error));
    }
  }
  
}
