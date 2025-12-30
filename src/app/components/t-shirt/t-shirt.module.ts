import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DesignElementComponent } from './design-element/design-element.component';
import { DesignerComponent } from './designer/designer.component';
import { OptionComponent } from './option/option.component';
import { OptionClipartComponent } from './option-clipart/option-clipart.component';
import { OptionColorComponent } from './option-color/option-color.component';
import { OptionDrawComponent } from './option-draw/option-draw.component';
import { OptionFontComponent } from './option-font/option-font.component';
import { OptionProductComponent } from './option-product/option-product.component';
import { OptionTextComponent } from './option-text/option-text.component';
import { OptionUploadComponent } from './option-upload/option-upload.component';
import { ProductDesignerComponent } from './product-designer/product-designer.component';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TShirtRoutingModule } from './t-shirt-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    ProductDesignerComponent,
    OptionUploadComponent,
    OptionTextComponent,
    OptionProductComponent,
    OptionFontComponent,
    OptionDrawComponent,
    OptionColorComponent,
    OptionClipartComponent,
    OptionComponent,
    DesignerComponent,
    DesignElementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgOptimizedImage,
    MatExpansionModule,
    MatSliderModule,
    NgxDropzoneModule,
    TShirtRoutingModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class TShirtModule { }
