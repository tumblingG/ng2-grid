import {ChangeDetectionStrategy, Component, ViewEncapsulation, TemplateRef, Input, Output, EventEmitter, QueryList,
    ContentChild,
    ContentChildren,
    OnInit,
    OnChanges,
    SimpleChanges, AfterContentInit, ViewChild} from '@angular/core';
import {SlThComponent} from "../sl-th/sl-th.component";
import {SlTheadComponent} from "../sl-thead/sl-thead.component";
import {SlVirtualScrollDirective} from "../sl-virtual-scroll.directive";
import {TableOptionsService} from '../services/table-options.service';
import {TbodyDirective} from '../tbody.directive';

@Component({
    selector: 'zc-table',
    templateUrl: './table.component.html',
    styleUrls: ['./sl-table.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnChanges, AfterContentInit{
    displayData = [];
    tableTitle: string | TemplateRef<void>;
    //TODO 开启分页
    enablePagination = false;
    hideOnSinglePage = true;
    showTotal = false;
    pageIndex = 1;
    //TODO 分页
    pageSize = 10;
    Scroll: {x: string | null, y: string | null} = {x: null, y: null};
    theadComponent: SlTheadComponent;
    virtualScroll = false;
    virtualItemSize = 0;
    virtualMinBufferPx = 100;
    virtualMaxBufferPx = 200;
    @Input() data = [];
    @Input() total = 0;
    @Input() loading = false;
    @Output() paginationChange: EventEmitter<{pageIndex: Number, pageSize: Number}> = new EventEmitter();
    @Output() currentPageDataChange: EventEmitter<any[]> = new EventEmitter();
    @ContentChildren(SlThComponent, {descendants: true}) listOfThComponent: QueryList<SlThComponent>;
    @ContentChild(SlVirtualScrollDirective) virtualScrollDirective: SlVirtualScrollDirective;
    tbodyDirective: TbodyDirective;

    pageSizeOrIndexChange($event) {
        Promise.resolve().then(() => this.paginationChange.emit($event));
        this.pageIndex = $event.pageIndex;
        this.pageSize = $event.pageSize;
        this.updateDisplayDataIfNeeded();
    }
    updateDisplayDataIfNeeded(isDataOrTotalChange: boolean = false):void {
        if (this.enablePagination) {
            if (isDataOrTotalChange) {
                const maxPageIndex = Math.ceil(this.total / this.pageSize) || 1;
                const pageIndex = this.pageIndex > maxPageIndex ? maxPageIndex : this.pageIndex;
                if (pageIndex !== this.pageIndex) {
                    this.pageIndex = pageIndex;
                    Promise.resolve().then(() => this.paginationChange.emit({
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize
                    }));
                }
            }
            this.displayData = this.data.slice((this.pageIndex -1) * this.pageSize, this.pageIndex * this.pageSize);
        } else {
            this.displayData = [...this.data];
        }
        this.currentPageDataChange.emit(this.displayData);
    }
    private merge(prop: string, value: any) {
        const isUndefined = (typeof value  === 'undefined');
        if (!isUndefined) {
            this[prop] = value;
        }
    }

    private initProps() {
        const options = this.tableOptionsService.options;
        const propNames = ['tableTitle', 'enablePagination','hideOnSinglePage','showTotal',
            'pageIndex','pageSize','Scroll','virtualScroll','virtualItemSize','virtualMinBufferPx',
            'virtualMaxBufferPx'];
        for (let prop of propNames) {
            this.merge(prop, options[prop]);
        }
    }

    ngOnInit(): void {
    }



    ngOnChanges(changes: SimpleChanges): void {
        if ((changes.data && changes.data.firstChange) || (changes.total && changes.total.firstChange)) {
            this.initProps();
        }
        if (changes.data || changes.total) {
            this.updateDisplayDataIfNeeded(!!(changes.data || changes.total));
        }

    }

    ngAfterContentInit(): void {
        console.log('thead',this.theadComponent);
    }

    constructor(
        private tableOptionsService: TableOptionsService
    ){

    }

}
