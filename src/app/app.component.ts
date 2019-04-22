import { Component, TemplateRef, ViewChild, OnInit, EmbeddedViewRef, ViewContainerRef, ElementRef, AfterViewInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit{
  title = 'ng2-table';
  total = 200;
  pageSize = 10;
  pageIndex = 2;
  template:  EmbeddedViewRef<void>;
  gridOptions: any = {};
  subject: BehaviorSubject<any>;
  @ViewChild('tdTemplate', {read: TemplateRef}) tpl: TemplateRef<any>;
  @ViewChild('haha', {read: ViewContainerRef}) container: ViewContainerRef;
  @ViewChild('head', {read: ElementRef}) header : ElementRef;
  listOfData = [];
  getRow() {
    this.subject && this.subject.subscribe(data => {
      console.log(data);
    })
  }
  showRowChange(data: any[]) {
    console.log('行数据',data);
  }
  constructor() {
  }
  ngAfterViewInit(): void {
    console.log('header', this.header);
  }

  ngOnInit(): void {

    this.template = this.tpl.createEmbeddedView({$implicit: {id:2}});
    console.log(this.template);
    this.container.insert(this.template);
    for(let i = 0; i < 100; i++) {
      this.listOfData.push({
        key: i + '',
        name: 'Jim Green' + i,
        age: 42,
        address: 'London No. 1 Lake Park' + i
      });
    }
    // this.container.createEmbeddedView(this.tdTemplate);
    this.gridOptions = {
      tableTitle: '第一个表格',
      enableRowSelection: true,
      enableRowHeaderSelection: true,
      selectionRowHeaderWidth: '10%',
      enablePagination: true,
      pageSize: 10,
      virtualScroll: true,
      virtualItemSize: 20,
      Scroll: {x: '400px', y: '200px'},
      rowClass: function(data, rowIndex) {
        return rowIndex + '';
      },
      rowIdentity: (row) => row.key,
      columnDefs: [
        {
          field: 'name',
          displayName: '名称',
          width: '20%',
          cellTemplate: this.tpl
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

  addIndex() {
    this.pageIndex++;
  }
  addTotal() {
    this.total++;
  }
  modeChange($event: number) {
    console.log(`ni ${$event}`);
  }

  disPlayDataChange($event) {
    console.log('displayData', $event);
  }

  console(data) {
    console.log(data);
  }

  tdClick($event) {
    console.log($event.target.innerHTML);
  }


}

