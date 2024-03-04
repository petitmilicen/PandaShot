import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SQLite } from '@ionic-native/sqlite/ngx';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,

  ],

  declarations: [Tab1Page],
  providers: [SQLite]
})
export class Tab1PageModule {}
