import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { provideToastr } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { InputTextareaModule } from 'primeng/inputtextarea';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartModule,
    TabViewModule,
    TableModule,
    FormsModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    DialogModule,
    NgbModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    ProgressSpinnerModule,
    RippleModule,
    InputTextareaModule
    
    
    
  ],
  exports:[
    ChartModule,
    TabViewModule,
    TableModule,
    FormsModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    NgbModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    ProgressSpinnerModule,
    RippleModule,
    InputTextareaModule
  ],
  providers:[
    provideToastr(),
    provideHttpClient(),

    ConfirmationService

  ]
})
export class SharedModule { }
