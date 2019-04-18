import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  TemplateRef,
  OnChanges,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {SlTableComponent} from '../sl-table/sl-table.component';
import {TableOptionsService} from '../services/table-options.service';
import {TableUtilService} from '../services/table-util.service';
import {HashKeyService} from '../services/hash-key.service';
import { TrDirective } from '../tr.directive';

@Component({
  selector: 'scheme-table',
  templateUrl: './scheme-table.component.html',
  styleUrls: ['./scheme-table.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableOptionsService, TableUtilService, HashKeyService]
})
export class SchemeTableComponent implements OnInit, OnChanges   {
  displayData: any[] = [];
  mapOfCheckedHashKey: {[key: string]: boolean};
  isAllDisplayDataChecked = false;
  checkedDataMap: Map<any, any>;
  @Input() data: any[] = [];
  @Input() options: {[index: string]: any};
  @Input() api: any;
  @Input() total: Number = 0;
  @Output() selectRowsChange: EventEmitter<any[]> = new EventEmitter();
  @Output() paginationChange: EventEmitter<number> = new EventEmitter();
  @Output() displayDataChange: EventEmitter<any[]> = new EventEmitter();
  @ViewChild('tableInstance')  tableInstance: SlTableComponent;
  @ViewChildren('tr') trs: TrDirective;

  /**
   * 选择所有，用于表格头选择，并把选择的数据加入checkedDataMap
   * @param checked
   */
  checkAll(checked: boolean): void {
    this.displayData.forEach(item => {
      const hashKey = item['$$hashKey'];
      this.mapOfCheckedHashKey[hashKey] = checked;
      checked ? (this.checkedDataMap.set(hashKey, item)) : (this.checkedDataMap.delete(hashKey));
    });
    this.refreshStatus();
  }

  /**
   * 根据是否当前展示数据是否全部选中，更新表头总选中的状态
   */
  private refreshStatus(): void {
    this.isAllDisplayDataChecked = this.displayData.every(item => this.mapOfCheckedHashKey[item['$$hashKey']]);
    this.selectRowsChange.emit(Array.from(this.checkedDataMap.values()));
  }

  /**
   * 单选行的选择事件，
   * @param checked: boolean, 是否选中
   * @param data: 该行的数据
   */
  singleCheck(checked: boolean, data: {[index: string]: any}): void {
    const hashKey = data['$$hashKey'];
    checked ? (this.checkedDataMap.set(hashKey, data)) : (this.checkedDataMap.delete(hashKey));
    this.refreshStatus();
  }

  /**
   * 当前展示的数据
   * @param data
   */
  currentPageDataChange(data: Array<{[index: string]: any}>): void {
    this.displayData = data;
    this.displayDataChange.emit(data);
    this.refreshStatus();
  }

  /**
   * 获取配置
   */
  get config(): {[index: string]: any} {
    return this.tableOptionService.options;
  }

  /**
   * 用于遍历tr的trackBy
   * @param index
   * @param data
   */
  trackByHashKey(index: number, data: any): any {
    return data['$$hashKey'];
  }

  /**
   * 判断value是否是函数，是返回true，否则返回false
   * @param value
   */
  isFunction(value: Function | undefined | null): boolean {
    return typeof value === 'function';
  }

  constructor(
      private tableOptionService: TableOptionsService,
      private hashKeyService: HashKeyService
  ) {

  }

  ngOnInit() {
    const {options} = this.tableOptionService;
    // 在允许行选择的时候才初始化行选择需要的数据
    if (options['enableRowSelection']) {
      this.checkedDataMap = new Map();
      this.mapOfCheckedHashKey = {};
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options.firstChange) {
      this.tableOptionService.initialize(this.options);
    }
    if (changes.data) {
      this.data.forEach(item => {
        this.hashKeyService.generateKey(item);
      });
    }
    console.log(this.data);
  }
}
