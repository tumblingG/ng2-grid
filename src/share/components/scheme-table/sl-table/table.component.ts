import {ChangeDetectionStrategy, Component, ViewEncapsulation, TemplateRef, Input, Output, EventEmitter, QueryList,
    ContentChild,
    ContentChildren,
    OnInit} from '@angular/core';
import {SlThComponent} from "../sl-th/sl-th.component";
import {SlTheadComponent} from "../sl-thead/sl-thead.component";
import {SlVirtualScrollDirective} from "../sl-virtual-scroll.directive";
import {TableOptionsService} from '../services/table-options.service';

@Component({
    selector: 'zc-table',
    templateUrl: './table.component.html',
    styleUrls: ['./sl-table.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit{

    displayData = [];
    tableTitle: string | TemplateRef<void>;
    enablePagination = false;
    hideOnSinglePage = true;
    showTotal = false;
    pageIndex = 1;
    pageSize = 10;
    Scroll: {x: string | null, y: string | null} = {x: null, y: null};
    theadComponent: SlTheadComponent;
    virtualScroll = false;
    virtualItemSize = 0;
    virtualMinBufferPx = 200;
    virtualMaxBufferPx = 100;
    @Input() data = [];
    @Input() total = 0;
    @Input() loading = false;
    @Output() paginationChange: EventEmitter<{pageIndex: Number, pageSize: Number}> = new EventEmitter();
    @Output() currentPageDataChange: EventEmitter<any[]> = new EventEmitter();
    @ContentChildren(SlThComponent, {descendants: true}) listOfThComponent: QueryList<SlThComponent>;
    @ContentChild(SlVirtualScrollDirective) virtualScrollDirective: SlVirtualScrollDirective;

    private merge(prop: string, value: any) {
        const isUndefined = (typeof value  === 'undefined');
        if (!isUndefined) {
            this[prop] = value;
        }
    }

    ngOnInit(): void {
        const options = this.tableOptionsService.options;
        const propNames = ['tableTitle', 'enablePagination','hideOnSinglePage','showTotal',
            'pageIndex','pageSize','Scroll','virtualScroll','virtualItemSize','virtualMinBufferPx',
            'virtualMaxBufferPx'];
        for (let prop of propNames) {
            this.merge(prop, options[prop]);
        }
    }

    constructor(
        private tableOptionsService: TableOptionsService
    ){}

}
