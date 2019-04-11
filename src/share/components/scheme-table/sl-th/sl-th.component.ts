import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Input, HostBinding, Output, EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChanges} from '@angular/core';
import { InputBoolean } from "../../../until/covert";
import {Subject} from 'rxjs';

@Component({
  selector: 'app-sl-th',
  templateUrl: './sl-th.component.html',
  styleUrls: ['./sl-th.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class SlThComponent implements OnInit, OnChanges, OnDestroy {
  slWidthChange$ = new Subject();
  @Input() slChecked = false;
  @Input() slWidth: string;
  @Input() @HostBinding() slAlign: 'left' | 'right' | 'center' = 'left';
  @Input() @InputBoolean() slShowCheckbox = false;
  @Output() readonly slCheckedChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.slWidth) {
      this.slWidthChange$.next(this.slWidth);
    }
  }

  ngOnDestroy(): void {
  }

}
