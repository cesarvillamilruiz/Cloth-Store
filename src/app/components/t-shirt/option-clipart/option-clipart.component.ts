import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionPreDesign } from 'src/app/model/option/option-pre-design.model';

@Component({
  selector: 'app-option-clipart',
  templateUrl: './option-clipart.component.html',
  styleUrl: './option-clipart.component.scss'
})
export class OptionClipartComponent {
  @Input() optionPreDesign: OptionPreDesign[];

  @Output() closeOptionProduct = new EventEmitter<void>();
  @Output() selectedDesignName = new EventEmitter<string>();
  
  categoryList: string[];
  optionPreDesignSelected: OptionPreDesign[];
  showDesigns: boolean;

  ngOnInit(): void {
    this.setCategoryList();
  }

  setDesignNodeListName(categoryName: string): void{
    this.optionPreDesignSelected = this.optionPreDesign.filter(x => x.category === categoryName);
    this.showDesigns = true;
  }

  setCategoryList(): void{
    this.categoryList = this.optionPreDesign.filter((item, index, self) =>
      index === self.findIndex((t) => t.category === item.category)).map(item => item.category);
  }

  onSelectDesign(designUrl: string): void {
    this.selectedDesignName.emit(designUrl);
  }

  onHideOption(): void {
    this.showDesigns = false;
  }
}
