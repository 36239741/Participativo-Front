import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatListModule } from '@angular/material/list'; 
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatDatepickerModule }  from '@angular/material/datepicker'; 
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatBadgeModule} from '@angular/material/badge';






@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatBadgeModule
  ],
  exports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatBadgeModule
  ],
  declarations: [],
  providers: 
  [
    MatDatepickerModule,
    MatNativeDateModule ,
  ],
})
export class MaterialModule { }
