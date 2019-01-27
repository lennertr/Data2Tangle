// --- Other ---
import 'hammerjs';
import { NgxElectronModule } from 'ngx-electron';
import { PapaParseModule } from 'ngx-papaparse';
import { ClipboardModule } from 'ngx-clipboard';

// --- Angular ---
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// --- Angular Material ---
import {
  MatButtonModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatToolbarModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule,
  MatTooltipModule,
  MatButtonToggleModule,
  MatTabsModule
} from '@angular/material';

// --- Components ---
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { ImportViewComponent } from './import-view/import-view.component';
import { ImportTangleSettingsComponentComponent } from './import-tangle-settings-component/import-tangle-settings-component.component';
import { ExportComponent } from './export/export.component';
import { ImportComponent } from './import/import.component';
import { LogComponent } from './log/log.component';

// --- Services ---

// --- Routes ---
const appRoutes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'import', component: ImportComponent },
  { path: 'import/view', component: ImportViewComponent },
  { path: 'import/tangleSettings', component: ImportTangleSettingsComponentComponent },
  { path: 'export', component: ExportComponent },
  { path: 'export/:tailTransactionHash', component: ExportComponent },
  { path: 'log', component: LogComponent },
  { path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  }
  // { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    ImportViewComponent,
    ImportTangleSettingsComponentComponent,
    ExportComponent,
    ImportComponent,
    LogComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // delete later on
    ),
    BrowserModule,
    HttpClientModule,
    NgxElectronModule,
    PapaParseModule,
    ClipboardModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
