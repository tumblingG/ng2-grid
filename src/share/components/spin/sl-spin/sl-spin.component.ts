import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Input, TemplateRef, ChangeDetectorRef, OnChanges,
  SimpleChanges,
  OnDestroy} from '@angular/core';
import {SlSizeLDSType} from "../../../types/size";
import {InputBoolean, InputNumber} from "../../../util/covert";
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'sl-spin',
  templateUrl: './sl-spin.component.html',
  styleUrls: ['./sl-spin.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.sl-spin-nested-loading]': '!nzSimple'
  }
})
export class SlSpinComponent implements OnInit, OnChanges, OnDestroy {
  @Input() slIndicator: TemplateRef<void>;
  @Input() slSize: SlSizeLDSType = 'default';
  @Input() slTip: string;
  @Input() @InputNumber() slDelay = 0;
  @Input() @InputBoolean() slSimple = false;
  @Input() @InputBoolean() slSpinning = true;
  loading = true;
  private spinning$ = new BehaviorSubject(this.slSpinning);
  private loading$: Observable<boolean> = this.spinning$.pipe(debounceTime(this.slDelay));
  private loading_: Subscription | null;

  subscribeLoading(): void {
    this.unsubscribeLoading();
    this.loading_ = this.loading$.subscribe(data => {
      this.loading = data;
      this.cdr.markForCheck();
    })
  }

  unsubscribeLoading(): void {
    if (this.loading_) {
      this.loading_.unsubscribe();
      this.loading_ = null;
    }
  }
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.subscribeLoading();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.slSpinning) {
      if (changes.slSpinning.isFirstChange()) {
        this.loading = this.slSpinning;
      }
      this.spinning$.next(this.slSpinning);
    }
    if (changes.slDelay) {
      this.loading$ = this.spinning$.pipe(debounceTime(this.slDelay));
      this.subscribeLoading();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeLoading();
  }

}
