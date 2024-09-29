import {  Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignNode } from 'src/app/model/Utility/design-node.model';
import { NgOptimizedImage } from '@angular/common'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-option-draw',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, NgOptimizedImage, FormsModule ],
  templateUrl: './option-draw.component.html',
  styleUrls: ['./option-draw.component.scss']
})
export class OptionDrawComponent implements OnInit {
  
  @Output() closeOptionProduct = new EventEmitter<void>();
  @Output() selectedDesignName = new EventEmitter<string>();

  designNodeList: DesignNode[];
  prompt: string;
  generatedImageUrl: string | null = null;

  readonly panelOpenState = signal(false);

  // setPanelOpenState(value: boolean): void {
  //   this.panelOpenState = value;
  // }

  constructor(private http: HttpClient) {}

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
      },
      //TODO Repeated
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
}
