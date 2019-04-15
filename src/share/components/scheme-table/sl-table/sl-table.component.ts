import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, QueryList, ContentChildren, ElementRef, ViewChild,
  ContentChild,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  Renderer2,
  OnChanges,
  AfterViewInit,
  SimpleChanges,
  AfterContentInit,
  OnDestroy} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {SlTheadComponent} from "../sl-thead/sl-thead.component";
import {SlThComponent} from "../sl-th/sl-th.component";
import {SlVirtualScrollDirective} from "../sl-virtual-scroll.directive";
import {InputBoolean, InputNumber} from "../../../util/covert";
import {SlMeasureScrollbarService} from "../../../services/sl-measure-scrollbar.service";
import {Subject, merge} from 'rxjs';
import { flatMap, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'sl-table',
  templateUrl: './sl-table.component.html',
  styleUrls: ['./sl-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    ['class.sl-table-empty']: 'data.length === 0'
  }
})
export class SlTableComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit, OnDestroy {
  data = [];
  slTheadComponent: SlTheadComponent;
  lastScrollLeft = 0;
  headerBottomStyle = {};
  private destroy$ = new Subject<void>();
  @ContentChildren(SlThComponent, {descendants: true}) listOfSlThComponent: QueryList<SlThComponent>;
  @ViewChild('tableHeaderElement', {read: ElementRef}) tableHeaderElement: ElementRef;
  @ViewChild('tableBodyElement', {read: ElementRef}) tableBodyElement: ElementRef;
  @ViewChild('tableMainElement', {read: ElementRef}) tableMainElement: ElementRef;
  @ViewChild(CdkVirtualScrollViewport, {read: ElementRef}) cdkVirtualScrollElement: ElementRef;
  @ContentChild(SlVirtualScrollDirective) slVirtualScrollDirective: SlVirtualScrollDirective
  @Input() slShowTotal: TemplateRef<{$implicit: number, range: [number, number]}>;
  @Input() @InputBoolean() slVirtualScroll = false;
  @Input() @InputNumber() slVirtualItemSize = 0;
  @Input() @InputNumber() slVirtualMaxBufferPx = 200;
  @Input() @InputNumber() slVirtualMinBufferPx = 100;
  @Input() slLoadingDelay = 0;
  @Input() slTotal = 0;
  @Input() slTitle: string | TemplateRef<void>;
  @Input() slFooter: string | TemplateRef<void>;
  @Input() slNoResult: string | TemplateRef<void>;
  @Input() slWidthConfig: string[] = [];
  @Input() slPageIndex = 1;
  @Input() slPageSize = 2;
  @Input() slData = [];
  @Input() slPaginationPosition: 'top' | 'bottom' | 'both' = 'bottom';
  @Input() slScroll: {x: string | null, y:string | null} = {x: null, y: null};
  @Input() @ViewChild('renderItemTemplate') slItemRender: TemplateRef<{
    $implicit: 'page' | 'prev' | 'next',
    page: number
  }>;
  @Input() @InputBoolean() slFrontPagination = true;
  @Input() @InputBoolean() slTemplateMode = false;
  @Input() @InputBoolean() slBordered = false;
  @Input() @InputBoolean() slShowPagination = true;
  @Input() @InputBoolean() slLoading = false;
  @Input() @InputBoolean() slShowSizeChanger = false;
  @Input() @InputBoolean() slHideOnSinglePage = false;
  @Output() readonly slPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly slPageIndexChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly slCurrentPageDataChange: EventEmitter<any[]> = new EventEmitter();

  get tableBodyNativeElement(): HTMLElement {
    return this.tableBodyElement && this.tableBodyElement.nativeElement;
  }

  get tableHeadNativeElement(): HTMLElement {
    return this.tableHeaderElement && this.tableHeaderElement.nativeElement;
  }

  get cdkVirtualScrollNativeElement(): HTMLElement {
    return this.cdkVirtualScrollElement && this.cdkVirtualScrollElement.nativeElement;
  }

  get mixTableBodyNativeElement(): HTMLElement {
    return this.tableBodyNativeElement || this.cdkVirtualScrollNativeElement;
  }

  emitPageSizeOrIndex(size: number, index: number): void {
    if (this.slPageSize !== size || this.slPageIndex !== index) {
      if (this.slPageSize !== size) {
        this.slPageSize = size;
        this.slPageSizeChange.emit(this.slPageSize);
      }
      if (this.slPageIndex) {
        this.slPageIndex = index;
        this.slPageIndexChange.emit(this.slPageIndex);
      }
    }
    this.updateFrontPaginationDataIfNeeded(this.slPageSize !== size)
  }

  syncScrollTable(e: MouseEvent): void {
    if (e.currentTarget === e.target) {
      const target = e.target as HTMLElement;
      if (target.scrollLeft !== this.lastScrollLeft && this.slScroll && this.slScroll.x) {
        if (target === this.mixTableBodyNativeElement && this.tableHeadNativeElement) {
          this.tableHeadNativeElement.scrollLeft = target.scrollLeft;
        } else if (target === this.tableHeadNativeElement && this.mixTableBodyNativeElement) {
          this.mixTableBodyNativeElement.scrollLeft = target.scrollLeft;
        }
        this.setScrollPositionClassName();
      }
      this.lastScrollLeft = target.scrollLeft;
    }
  }

  setScrollPositionClassName(): void {
    if (this.mixTableBodyNativeElement && this.slScroll && this.slScroll.x) {
      if (
          this.mixTableBodyNativeElement.scrollWidth === this.mixTableBodyNativeElement.clientWidth &&
          this.mixTableBodyNativeElement.scrollWidth !== 0
      ) {
        this.setScrollName();
      } else if (this.mixTableBodyNativeElement.scrollLeft === 0) {
        this.setScrollName('left')
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
    const prefix = 'sl-table-scroll-position';
    const classList = ['left', 'right', 'middle'];
    classList.forEach(name => {
      this.renderer.removeClass(this.tableMainElement.nativeElement, `${prefix}-${name}`);
    });
    if (position) {
      this.renderer.addClass(this.tableMainElement.nativeElement, `${prefix}-${position}`);
    }
  }

  fitScrollBar(): void {
    const scrollbarWidth = this.slMeasureScrollbarService.scrollBarWidth;
    if (scrollbarWidth) {
      this.headerBottomStyle = {
        marginBottom: `-${scrollbarWidth}px`,
        padddingBottom: `0px`
      };
      this.cdr.markForCheck();
    }
  }

  updateFrontPaginationDataIfNeeded(isPageSizeOrDataChange: boolean = false): void {
    let data = [];
    if (this.slFrontPagination) {
      this.slTotal = this.slData.length;
      if (isPageSizeOrDataChange) {
        const maxPageIndex = Math.ceil(this.slData.length / this.slPageSize) || 1;
        const pageIndex = this.slPageIndex > maxPageIndex ? maxPageIndex : this.slPageIndex;
        if (pageIndex !== this.slPageIndex) {
          this.slPageIndex = pageIndex;
          Promise.resolve().then(() => this.slPageIndexChange.emit(pageIndex));
        }
      }
      data = this.slData.slice((this.slPageIndex -1) * this.slPageSize, this.slPageIndex * this.slPageSize);
    } else {
      data = this.slData;
    }
    this.data = [...data];
    this.slCurrentPageDataChange.next(this.data);
  }

  constructor(
      private renderer: Renderer2,
      private cdr: ChangeDetectorRef,
      private slMeasureScrollbarService: SlMeasureScrollbarService,
      elementRef: ElementRef
  ) {
    renderer.addClass(elementRef.nativeElement, 'sl-table-wrapper');
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.slScroll) {
      if (changes.slScroll.currentValue) {
        this.slScroll = changes.slScroll.currentValue
      } else {
        this.slScroll = {x: null, y: null};
      }
      this.setScrollPositionClassName();
    }
    if (changes.slPageIndex || changes.slPageSize || changes.slFrontPagination || changes.slData) {
      this.updateFrontPaginationDataIfNeeded(!!(changes.slPageSize || changes.slData));
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setScrollPositionClassName());
    //TODO ngZone
  }

  ngAfterContentInit(): void {
    this.listOfSlThComponent.changes
        .pipe(
            startWith(true),
            flatMap(() =>
            merge(this.listOfSlThComponent.changes, ...this.listOfSlThComponent.map(th => th.slWidthChange$))
            ),
            takeUntil(this.destroy$)
        ).subscribe(() => {
          this.cdr.markForCheck();
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
