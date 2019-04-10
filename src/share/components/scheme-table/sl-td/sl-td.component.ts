import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  HostBinding
} from '@angular/core';
import {InputBoolean} from "../../../until/covert";


@Component({
  selector: 'td:not(.sl-disable-td)',
  templateUrl: './sl-td.component.html',
  styleUrls: ['./sl-td.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class SlTdComponent implements OnChanges {
  @Input() slChecked = false;
  @Input() slDisabled = false;
  @Input() slIndeterminate = false;
  @Input() slLeft: string;
  @Input() slRight: string;
  @Input() @HostBinding('style.text-align') slAlign: 'left' | 'right' | 'center' = 'left';
  @Input() @InputBoolean() slSHowCheckbox = false;
  @Output() readonly slCheckedChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {

  }

}
