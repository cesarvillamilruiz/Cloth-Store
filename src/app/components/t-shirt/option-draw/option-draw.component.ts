import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignNode } from 'src/app/model/Utility/design-node.model';
import { NgOptimizedImage } from '@angular/common'
import { ImageCreatorServiceService } from 'src/app/services/image-creator-service.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { TreeNode } from '../../../model/Utility/tree-node.model';
import { NodeInformation } from 'src/app/model/Utility/node-information.model';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-option-draw',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, HttpClientModule, FormsModule, MatTreeModule, MatButtonModule, MatIconModule],
  templateUrl: './option-draw.component.html',
  styleUrls: ['./option-draw.component.scss']
})
export class OptionDrawComponent implements OnInit {
  
  @Output() closeOptionProduct = new EventEmitter<void>();
  @Output() selectedDesignName = new EventEmitter<string>();

  designNodeList: DesignNode[];
  prompt: string;
  generatedImageUrl: string | null = null;

  treeData: TreeNode[] = [
    {
      name: 'Fruit',
      children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
    },
    {
      name: 'Vegetables',
      children: [
        {
          name: 'Green',
          children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
        },
        {
          name: 'Orange',
          children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
        },
      ],
    },
  ];

  constructor(private http: HttpClient) {
    this.dataSource.data = this.treeData;
  }

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<NodeInformation>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: NodeInformation) => node.expandable;

  private apiUrl = `https://api.openai.com/v1/images/generations`; // Replace with actual API URL
  apiKey = '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';

  generateImage(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const body = {
      "prompt": this.prompt,
      "n":1,
      "size":"1024x1024"
     };

    this.http.post(this.apiUrl, body, { headers }).subscribe({
      next: response => {
        this.generatedImageUrl = (response as any).data[0].url;
      },
      error: err => console.log(err),
      complete: () => console.log('Complete')
    });
  }  

  ngOnInit(): void {
    this.setDesignNodeList();
  }

  setDesignNodeList(): void {
    let root = './../../../../assets/design/';
    this.designNodeList = [
      {
        name : 'bird.png',
        path : `${root}bird.png`
      },
      {
        name : 'branches.png',
        path : `${root}branches.png`
      },
      {
        name : 'decorative.png',
        path : `${root}decorative.png`
      },
      {
        name : 'flock.png',
        path : `${root}flock.png`
      },
      {
        name : 'floral.png',
        path : `${root}floral.png`
      },
      {
        name : 'mushrooms.png',
        path : `${root}mushrooms.png`
      },
      {
        name : 'sugar-skull.png',
        path : `${root}sugar-skull.png`
      },
      {
        name : 'tropical.png',
        path : './../../../../assets/design/tropical.png'
      }
    ]
  }

  onSelectDesign(selectedDesignName: string): void {
    this.selectedDesignName.emit(selectedDesignName);
  }

  onCloseOptionProduct(): void {
    this.closeOptionProduct.emit();
  }
}
