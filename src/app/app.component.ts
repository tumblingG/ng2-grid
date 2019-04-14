import { Component, TemplateRef, ViewChild, OnInit, EmbeddedViewRef, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'ng2-table';
  total = 200;
  pageSize = 10;
  pageIndex = 2;
  template:  EmbeddedViewRef<void>;
  @ViewChild('tdTemplate', {read: TemplateRef}) tpl: TemplateRef<any>;
  @ViewChild('haha', {read: ViewContainerRef}) container: ViewContainerRef;
  constructor() {
  }
  ngOnInit(): void {
    this.template = this.tpl.createEmbeddedView({$implicit: {id:2}});
    console.log(this.template);
    this.container.insert(this.template);
    // this.container.createEmbeddedView(this.tdTemplate);
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

  console(data) {
    console.log(data);
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
        cellTemplate: () => {
          return this.tpl;
          //return `<a href="https://www.baidu.com" (click)="console(1)">${data['name']}</a>`;
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

