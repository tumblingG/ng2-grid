import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean, InputNumber } from "../../../util/covert";

@Component({
  selector: 'sl-pagination',
  templateUrl: './zc-pagination.component.html',
  styleUrls: ['./zc-pagination.component.less'],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZcPaginationComponent implements OnChanges {

  firstIndex = 1;
  pages: number[] = [];
  @Output() readonly paginationChange: EventEmitter<{pageIndex: number, pageSize: number}> = new EventEmitter();
  @Input() showTotal: TemplateRef<{ $implicit: number; range: [number, number] }>;
  @Input() zcSize: 'default' | 'small' = 'default';
  @Input() @ViewChild('renderItemTemplate') zcItemRender: TemplateRef<{
    $implicit: 'page' | 'prev' | 'next';
    page: number
  }>;
  @Input() @InputBoolean() hideOnSinglePage = false;
  @Input() @InputNumber() total = 0;
  @Input() @InputNumber() pageSize = 10;
  @Input() @InputNumber() pageIndex = 1;

  get lastIndex(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  get isLastIndex(): boolean {
    return this.pageIndex === this.lastIndex;
  }

  get isFirstIndex(): boolean {
    return this.pageIndex === this.firstIndex;
  }

  get ranges(): number[] {
    return [(this.pageIndex -1) * this.pageSize, Math.min(this.pageIndex *
    this.pageSize, this.total)];
  }

  buildIndexes(): void {
    const pages: number[] = [];
    if (this.lastIndex <= 9) {
      for (let i = 2; i <= this.lastIndex-1; i++) {
        pages.push(i);
      }
    } else {
      const current = +this.pageIndex;
      let left = Math.max(2, current - 2);
      let right = Math.min(current + 2, this.lastIndex - 1);
      if (current -1 <= 2) {
        right = 5;
      }
      if (this.lastIndex - current <= 2) {
        left = this.lastIndex - 4;
      }
      for (let i = left; i <= right; i++) {
        pages.push(i);
      }
    }
    this.pages = pages;
    this.cdr.markForCheck();
  }

  validatePageIndex(value: number): number {
    if (value > this.lastIndex) {
      return this.lastIndex;
    } else if (value < this.firstIndex) {
      return this.firstIndex;
    } else {
      return value;
    }
  }

  updatePageIndexValue(page: number): void {
    this.pageIndex = page;
    this.paginationChange.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    });
    this.buildIndexes();
  }

  isPageIndexValid(value: number): boolean {
    return this.validatePageIndex(value) === value;
  }

  jumpPage(index: number): void {
    if (index !== this.pageIndex) {
      const pageIndex = this.validatePageIndex(index);
      if (pageIndex !== this.pageIndex) {
        this.updatePageIndexValue(pageIndex);
      }
    }
  }

  jumpDiff(diff: number): void {
    this.jumpPage(this.pageIndex + diff);
  }

  constructor(private cdr: ChangeDetectorRef) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.total || changes.pageSize || changes.pageIndex) {
      this.buildIndexes();
    }
  }
}
