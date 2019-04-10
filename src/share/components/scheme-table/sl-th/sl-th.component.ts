import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Input, HostBinding, Output, EventEmitter} from '@angular/core';
import { InputBoolean } from "../../../until/covert";

@Component({
  selector: 'app-sl-th',
  templateUrl: './sl-th.component.html',
  styleUrls: ['./sl-th.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class SlThComponent implements OnInit {
  @Input() slChecked = false;
  @Input() @HostBinding() slAlign: 'left' | 'right' | 'center' = 'left';
  @Input() @InputBoolean() slShowCheckbox = false;
  @Output() readonly slCheckedChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
