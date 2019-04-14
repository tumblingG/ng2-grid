import { Component, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ng2-table';
  total = 200;
  pageSize = 10;
  pageIndex = 2;

  constructor() {
  }

  addIndex() {
    this.pageIndex++;
  }
  addTotal() {
    this.total++;
  }
  modeChange($event: number) {
    console.log(`ni ${$event}`);
  }

  tdClick($event) {
    console.log($event.target.innerHTML);
  }

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
  gridOptions = {
    data: this.listOfData,
    enableRowSelection: true,
    enableRowHeaderSelection: true,
    selectionRowHeaderWidth: '10%',
    rowClass: function(data, rowIndex) {
      return rowIndex + '';
    },
    trackKey: 'key',
    columnDefs: [
        {
        field: 'name',
        displayName: '名称',
        width: '20%',
        cellTemplate: function(data) {
          return `<a href="https://www.baidu.com" (click)="console(1)">${data['name']}</a>`;
        }
      },
      {
        field: 'age',
        displayName: '年龄',
        width: '20%',
        cellClass: function(data) {
          if (data.age > 40) {
            return 'red';
          }
        }
      },
      {
        field: 'address',
        displayName: '地址',
        width: '20%',
      },
    ]
  }

}

