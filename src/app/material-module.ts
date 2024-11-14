import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { NgSelectModule } from "@ng-select/ng-select";
// import { NgSelectComponent } from '@ng-select/ng-select';

@NgModule({
    // imports: [
    //     MatTableModule,
    //     MatCheckboxModule,
    //     ReactiveFormsModule
    // ],
    // declarations: [],
    imports: [
        MatPaginatorModule,
        MatInputModule,
        MatTableModule,      // Make sure this is included
        MatIconModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatExpansionModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
      ],
      exports: [
        MatPaginatorModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatExpansionModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule
        // Add other Material modules you want to export
      ]
    
})
export class MaterialModule { }