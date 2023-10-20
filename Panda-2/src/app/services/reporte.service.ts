import { Injectable } from '@angular/core';
import { BdserviceService } from './bdservice.service';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private storage: Storage, private databaseService: BdserviceService) {
    this.databaseService.initializeDatabase().then(() => {
      this.database = this.databaseService.database;
      this.crearTablas();
      
    });
  }

  database!: SQLiteObject;
  isready: BehaviorSubject<boolean> = new BehaviorSubject(false);

  tablaReportes = `CREATE TABLE IF NOT EXISTS reporte (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    motivo VARCHAR(255),
    imagen_id INTEGER,
    FOREIGN KEY (imagen_id) REFERENCES imagen (id)
  );
  `

  async crearTablas() {
    try {
    await this.database.executeSql(
      this.tablaReportes,
      []
    )
    this.isready.next(true);
    } catch (error) {
      console.error('Error al crear la tabla:', error);
    }
    
  }
}
