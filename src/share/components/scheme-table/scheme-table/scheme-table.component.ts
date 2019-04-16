import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  TemplateRef
} from '@angular/core';
import {defaultConfig} from "../scheme-table.defaultConfig";
import {SlTableComponent} from '../sl-table/sl-table.component';
import {TableOptionsService} from '../services/table-options.service';
import {TableUtilService} from '../services/table-util.service';

@Component({
  selector: 'scheme-table',
  templateUrl: './scheme-table.component.html',
  styleUrls: ['./scheme-table.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableOptionsService, TableUtilService]
})
export class SchemeTableComponent implements OnInit {
  title = 'AAA';
  @Input() data: any[] = [];
  listOfDisplayData: any[] = [];
  selectedData: any[] = [];
  API: any;
  trackKey: string = 'id';
  isAllDisplayDataChecked = false;
  mapOfCheckedKey: {[key: string]: boolean} = {};
  @ViewChild('ggg', {read: TemplateRef}) tpl: TemplateRef<any>;
  @ViewChild('tableInstance')  tableInstance: SlTableComponent;
  @Input() config: any;
  @Output() selectDataChange: EventEmitter<any[]> = new EventEmitter();
  @Output() PageIndexChange: EventEmitter<number> = new EventEmitter();

  getTemplate() {
    return this.tpl;
  }
  trackById = (index: number, item: any): string | number => {
    let key = this.trackKey || 'id';
    return item[key];
  }
  currentPageDataChange($event: any[]): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }
  refreshStatus(): void {
    var key = this.trackKey;
    this.isAllDisplayDataChecked = this.listOfDisplayData.every(item =>
      this.mapOfCheckedKey[item[key]]
    );
  }
  checkAll(value: boolean): void {
    console.log(this.mapOfCheckedKey);
    var key = this.trackKey;
    this.listOfDisplayData.forEach(item => (this.mapOfCheckedKey[item[key]]) = value);
    // this.refreshStatus();
  }

  isFunction(value) {
    return typeof value === 'function' ? true : false;
  }

  constructor() { }

  ngOnInit() {
    this.config = Object.assign({}, defaultConfig, this.config);
    let { API, trackKey } = this.config;
    trackKey && (this.trackKey = trackKey);
    if (!this.data.length && API && typeof API === 'object') {
      this.API = API;
      API.get().subscribe(result => {
        this.data = result.data;
      });
    }
  }
}
