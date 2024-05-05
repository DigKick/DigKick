import { Component, Input, OnInit } from '@angular/core';
import { Table } from 'src/app/core/static/models/table.model';
import { TableViewComponent } from '../../table-view.component';

@Component({
  selector: 'app-table-display',
  standalone: true,
  imports: [],
  templateUrl: './table-display.component.html',
  styleUrl: './table-display.component.css'
})
export class TableDisplayComponent implements OnInit{

  random: number = 1;

  @Input() table: any;

  constructor() {
    
  }
  ngOnInit(): void {
    this.random = this.randomImagePath();
  }
  
  randomImagePath(): number {
    const imageIndex = Math.floor(Math.random() * 4) + 1;
    return imageIndex;
  }

}
