import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { NgModule } from '@angular/core';

const MATERIALS =[
    MatToolbarModule,
    MatDividerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule
]

@NgModule({
    imports: MATERIALS,
    exports: MATERIALS
})

export class MaterialModule{}