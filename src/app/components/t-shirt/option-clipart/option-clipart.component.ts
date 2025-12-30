import { Component, EventEmitter, Output } from '@angular/core';
import { DesignNode } from 'src/app/model/utility/design-node.model';
import { designNodeList } from '../../../util/configuration/option-clip-art.configuration.json';

@Component({
  selector: 'app-option-clipart',
  templateUrl: './option-clipart.component.html',
  styleUrl: './option-clipart.component.scss'
})
export class OptionClipartComponent {

  @Output() closeOptionProduct = new EventEmitter<void>();
  @Output() selectedDesignName = new EventEmitter<string>();
  
  designNodeList: DesignNode[];
  categoryList: string[];
  designNodeListName: DesignNode[];
  showDesigns: boolean;

  ngOnInit(): void {
    this.setDesignNodeList();
    this.setCategoryList();
  }

  setDesignNodeListName(categoryName: string): void{
    this.designNodeListName = this.designNodeList.filter(x => x.category === categoryName);
    this.showDesigns = true;
  }

  setCategoryList(): void{
    this.categoryList = this.designNodeList.filter((item, index, self) =>
      index === self.findIndex((t) => t.category === item.category)).map(item => item.category);
  }

  setDesignNodeList(): void {
    let root = './../../../../assets/design/';
    
    this.designNodeList = designNodeList;
  }

  onSelectDesign(selectedDesignName: string): void {
    this.selectedDesignName.emit(selectedDesignName);
  }

  onHideOption(): void {
    this.showDesigns = false;
  }
}
