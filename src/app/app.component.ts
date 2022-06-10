import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import {
  GridComponent,
  GridColumn,
  DataAdapter,
  Smart,
} from 'smart-webcomponents-angular/grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnInit {
  @ViewChild('grid', { read: GridComponent, static: false })
  grid: GridComponent;

  dataSource = new Smart.DataAdapter({
    dataSource: [
      { firstName: 'John', price: 2.59999999 },
      { firstName: 'John', price: 2.5999 },
      { firstName: 'John', price: 2.52454 },
      { firstName: 'John', price: 2.31231 },
    ],
    dataFields: ['firstName: string', 'price: number'],
  });

  columns = [
    {
      label: 'First Name',
      dataField: 'firstName',
    },
    {
      label: 'Unit Price',
      dataField: 'price',
      cellsFormat: 'f2',
      summary: ['sum'],
    },
  ];

  editing = {
    enabled: true,
    mode: 'cell',
  };

  summary = {
    visible: true,
    editing: false,
  };

  SummaryConditionalFormatting() {
    // Update summary cell after edit
    let summaryCellElement = document.querySelector(
      '.smart-grid-summary-row-cell[data-field="price"] div'
    ) as HTMLElement;
    if (summaryCellElement) {
      let content_arr = summaryCellElement!.firstChild!.textContent!.trim().split(' ');
      let text = content_arr[0];
      let value: number = parseFloat(content_arr[1]);
      //Format css based on value
      if (value > 10) {
        summaryCellElement!.style!.backgroundColor = 'lightblue';
      } else {
        summaryCellElement!.style!.backgroundColor = 'red';
      }

      //Format value
      summaryCellElement.textContent = text + ' ' + value.toFixed(2);
    }
  }

  onEndEdit() {
    setTimeout(() => {
      this.SummaryConditionalFormatting();
    }, 0)
  }

  onReady() {
      this.SummaryConditionalFormatting();
  }

  ngOnInit(): void {
    // onInit code.
    
  }

  ngAfterViewInit(): void {
    // afterViewInit code.
    this.init();
    setTimeout(() => {
      this.SummaryConditionalFormatting();
    }, 0)
  }

  init(): void {
    // init code.
  }
}
