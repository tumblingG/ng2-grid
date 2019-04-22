import {ChangeDetectionStrategy, Component, ViewEncapsulation, TemplateRef, Input, Output, EventEmitter, QueryList,
    ContentChild,
    ContentChildren,
    OnInit,
    OnChanges,
    SimpleChanges, AfterContentInit, ViewChild, ElementRef,NgZone, ChangeDetectorRef, Renderer2, OnDestroy,
    AfterViewInit} from '@angular/core';
import {SlThComponent} from "../sl-th/sl-th.component";
import {SlTheadComponent} from "../sl-thead/sl-thead.component";
import {SlVirtualScrollDirective} from "../sl-virtual-scroll.directive";
import {TableOptionsService} from '../services/table-options.service';
import {TbodyDirective} from '../tbody.directive';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {SlMeasureScrollbarService} from "../services/sl-measure-scrollbar.service";
import { fromEvent, merge, EMPTY, Subject } from 'rxjs';
import { flatMap, startWith, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'zc-table',
    templateUrl: './table.component.html',
    styleUrls: ['./sl-table.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy{
    displayData = [];
    lastScrollLeft = 0;
    headerBottomStyle = {};
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
    private $destroy = new Subject<void>();
    @Input() data = [];
    @Input() total = 0;
    @Input() loading = false;
    @Output() paginationChange: EventEmitter<{pageIndex: Number, pageSize: Number}> = new EventEmitter();
    @Output() currentPageDataChange: EventEmitter<any[]> = new EventEmitter();
    @ContentChildren(SlThComponent, {descendants: true}) listOfThComponent: QueryList<SlThComponent>;
    @ContentChild(SlVirtualScrollDirective) virtualScrollDirective: SlVirtualScrollDirective;
    tbodyDirective: TbodyDirective;
    @ViewChild('tableBodyElement', {read: ElementRef}) tableBodyElement: ElementRef;
    @ViewChild('fixedHeaderElement', {read: ElementRef}) fixedHeaderElement: ElementRef;
    @ViewChild('tableMainElement', { read: ElementRef }) tableMainElement: ElementRef;
    @ViewChild(CdkVirtualScrollViewport, { read: ElementRef }) cdkVirtualScrollElement: ElementRef;

    get tableBodyNativeElement(): HTMLElement {
        return this.tableBodyElement && this.tableBodyElement.nativeElement;
    }

    get tableHeaderNativeElement(): HTMLElement {
        return this.fixedHeaderElement && this.fixedHeaderElement.nativeElement;
    }

    get cdkVirtualScrollNativeElement(): HTMLElement {
        return this.cdkVirtualScrollElement && this.cdkVirtualScrollElement.nativeElement;
    }

    get mixTableBodyNativeElement(): HTMLElement {
        return this.cdkVirtualScrollNativeElement || this.tableBodyNativeElement;
    }

    syncScrollTable(e: MouseEvent): void {
        if (e.currentTarget === e.target) {
            const target = e.target as HTMLElement;
            if (target.scrollLeft !== this.lastScrollLeft && this.Scroll && this.Scroll.x) {
                if (target === this.mixTableBodyNativeElement && this.tableHeaderNativeElement) {
                    this.tableHeaderNativeElement.scrollLeft = target.scrollLeft;
                } else if (target === this.tableHeaderNativeElement && this.mixTableBodyNativeElement) {
                    this.mixTableBodyNativeElement.scrollLeft = target.scrollLeft;
                }
                this.setScrollPositionClassName();
            }
            this.lastScrollLeft = target.scrollLeft;
        }
    }

    setScrollPositionClassName(): void {
        if (this.mixTableBodyNativeElement && this.Scroll && this.Scroll.x) {
            if (
                this.mixTableBodyNativeElement.scrollWidth === this.mixTableBodyNativeElement.clientWidth &&
                this.mixTableBodyNativeElement.scrollWidth !== 0
            ) {
                this.setScrollName();
            } else if (this.mixTableBodyNativeElement.scrollLeft === 0) {
                this.setScrollName('left');
            } else if (
                this.mixTableBodyNativeElement.scrollWidth ===
                this.mixTableBodyNativeElement.scrollLeft + this.mixTableBodyNativeElement.clientWidth
            ) {
                this.setScrollName('right');
            } else {
                this.setScrollName('middle');
            }
        }
    }

    setScrollName(position?: string): void {
        const prefix = 'ant-table-scroll-position';
        const classList = ['left', 'right', 'middle'];
        classList.forEach(name => {
            this.renderer.removeClass(this.tableMainElement.nativeElement, `${prefix}-${name}`);
        });
        if (position) {
            this.renderer.addClass(this.tableMainElement.nativeElement, `${prefix}-${position}`);
        }
    }

    fitScrollBar(): void {
        const scrollbarWidth = this.measureScrollbarService.scrollBarWidth;
        if (scrollbarWidth) {
            this.headerBottomStyle = {
                marginBottom: `-${scrollbarWidth}px`,
                paddingBottom: `0px`
            };
            this.cdr.markForCheck();
        }
    }


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
        this.setScrollPositionClassName();
    }


    ngOnInit(): void {
        //this.renderer.addClass(this.tableBodyElement.nativeElement, 'haha');
    }



    ngOnChanges(changes: SimpleChanges): void {
        if ((changes.data && changes.data.firstChange) || (changes.total && changes.total.firstChange)) {
            this.initProps();
        }
        if (changes.data || changes.total) {
            this.updateDisplayDataIfNeeded(!!(changes.data || changes.total));
        }

    }

    ngAfterViewInit(): void {
        setTimeout(() => this.setScrollPositionClassName());
        this.ngZone.runOutsideAngular(() => {
            merge<MouseEvent>(
                this.tableHeaderNativeElement ? fromEvent<MouseEvent>(this.tableHeaderNativeElement, 'scroll'): EMPTY,
                this.mixTableBodyNativeElement ? fromEvent<MouseEvent>(this.mixTableBodyNativeElement, 'scroll'): EMPTY
            ).pipe(takeUntil(this.$destroy))
                .subscribe((e: MouseEvent) => {
                    this.syncScrollTable(e);
                });
            fromEvent<UIEvent>(window, 'resize')
                .pipe(
                    startWith(true),
                    takeUntil(this.$destroy)
                ).subscribe(() => {
                    this.fitScrollBar();
                    this.setScrollPositionClassName();
            })
        })
    }

    ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }

    constructor(
        private tableOptionsService: TableOptionsService,
        private ngZone: NgZone,
        private cdr: ChangeDetectorRef,
        private renderer: Renderer2,
        private measureScrollbarService: SlMeasureScrollbarService
    ){

    }

}
