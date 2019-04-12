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
  @Output() readonly zcPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly zcPageIndexChange: EventEmitter<number> = new EventEmitter();
  @Input() zcShowTotal: TemplateRef<{ $implicit: number; range: [number, number] }>;
  @Input() zcSize: 'default' | 'small' = 'default';
  @Input() @ViewChild('renderItemTemplate') zcItemRender: TemplateRef<{
    $implicit: 'page' | 'prev' | 'next';
    page: number
  }>;
  @Input() @InputBoolean() zcHideOnSinglePage = false;
  @Input() @InputNumber() zcTotal = 0;
  @Input() @InputNumber() zcPageSize = 10;
  @Input() @InputNumber() zcPageIndex = 1;

  get lastIndex(): number {
    return Math.ceil(this.zcTotal / this.zcPageSize);
  }

  get isLastIndex(): boolean {
    return this.zcPageIndex === this.lastIndex;
  }

  get isFirstIndex(): boolean {
    return this.zcPageIndex === this.firstIndex;
  }

  get ranges(): number[] {
    return [(this.zcPageIndex -1) * this.zcPageSize, Math.min(this.zcPageIndex *
    this.zcPageSize, this.zcTotal)];
  }

  buildIndexes(): void {
    const pages: number[] = [];
    if (this.lastIndex <= 9) {
      for (let i = 2; i <= this.lastIndex-1; i++) {
        pages.push(i);
      }
    } else {
      const current = +this.zcPageIndex;
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
    this.zcPageIndex = page;
    this.zcPageIndexChange.emit(this.zcPageIndex);
    this.buildIndexes();
  }

  isPageIndexValid(value: number): boolean {
    return this.validatePageIndex(value) === value;
  }

  jumpPage(index: number): void {
    if (index !== this.zcPageIndex) {
      const pageIndex = this.validatePageIndex(index);
      if (pageIndex !== this.zcPageIndex) {
        this.updatePageIndexValue(pageIndex);
      }
    }
  }

  jumpDiff(diff: number): void {
    this.jumpPage(this.zcPageIndex + diff);
  }

  constructor(private cdr: ChangeDetectorRef) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.zcTotal || changes.zcPageSize || changes.zcPageIndex) {
      this.buildIndexes();
    }
  }
}
