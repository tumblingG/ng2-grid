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

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
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

}
