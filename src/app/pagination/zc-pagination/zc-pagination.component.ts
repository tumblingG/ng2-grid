import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'zc-pagination',
  templateUrl: './zc-pagination.component.html',
  styleUrls: ['./zc-pagination.component.less'],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZcPaginationComponent implements OnInit, OnDestroy, OnChanges {

  firstIndex = 1;
  pages: number[] = [];
  private $destory = new Subject<void>();
  @Output() readonly zcPageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() readonly zcPageIndexChange: EventEmitter<number> = new EventEmitter();
  @Input() zcTotal = 0;
  @Input() zcPageSize = 10;
  @Input() zcPageIndex = 1;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.zcTotal || changes.zcPageSize || changes.zcPageIndex) {
      this.buildIndexes();
    }
  }

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
    this.zcPageSize = page;
    this.zcPageIndexChange.emit(this.zcPageIndex);
    this.buildIndexes();
  }

  isPageIndexValid(value: number): boolean {
    return this.validatePageIndex(value) === value;
  }

  onPageSizeChange($event: number): void {
    this.zcPageIndex = $event;
    this.zcPageIndexChange.emit($event);
    this.buildIndexes();
    if (this.zcPageIndex > this.lastIndex) {
      this.updatePageIndexValue(this.lastIndex);
    }
  }
}
