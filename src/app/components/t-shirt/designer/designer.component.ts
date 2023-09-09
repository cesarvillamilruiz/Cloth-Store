import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { OptionComponent } from '../option/option.component';
import { ProductDesignerComponent } from '../product-designer/product-designer.component';
import { OptionWindow } from 'src/app/enum/option.enum';

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    OptionComponent,
    ProductDesignerComponent,
  ],
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss'],
})
export class DesignerComponent implements OnInit{

  currentOption: WritableSignal<OptionWindow>;
  isNewElement: WritableSignal<boolean>;

  ngOnInit(): void {
    this.setInitialValue();
  }

  private setInitialValue(): void {
    this.currentOption = signal(OptionWindow.empty);
    this.isNewElement = signal(true);
  }

  setCurrentOption(currentOption: OptionWindow): void {
    this.currentOption.set(currentOption);
    this.isNewElement.set(true);
  }
}
