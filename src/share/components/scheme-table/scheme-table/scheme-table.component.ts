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
import {defaultConfig} from "../scheme-table.defaultConfig";
import {SlTableComponent} from '../sl-table/sl-table.component';
import {TableOptionsService} from '../services/table-options.service';
import {TableUtilService} from '../services/table-util.service';
import {RowHashMapService} from '../services/row-hash-map.service';
import { TrDirective } from '../tr.directive';

@Component({
  selector: 'scheme-table',
  templateUrl: './scheme-table.component.html',
  styleUrls: ['./scheme-table.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableOptionsService, TableUtilService, RowHashMapService]
})
export class SchemeTableComponent implements OnInit, OnChanges   {
  @Input() data: any[] = [];
  @Input() options: {[index: string]: any};
  @Input() api: any;
  @Input() total: Number = 0;
  @Output() selectRowsChange: EventEmitter<any[]> = new EventEmitter();
  @Output() paginationChange: EventEmitter<number> = new EventEmitter();
  @ViewChild('tableInstance')  tableInstance: SlTableComponent;
  @ViewChildren('tr') trs: TrDirective;
  constructor(
      private tableOptionService: TableOptionsService,
      private rowHashMapService: RowHashMapService
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options.firstChange) {
      this.options = this.tableOptionService.initialize(this.options);
      this.rowHashMapService.initialize(this.options);
    }
    if (changes.data) {
      this.data.forEach(item => {
        this.rowHashMapService.add(item);
      });
    }
  }
}
