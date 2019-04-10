import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Input} from '@angular/core';

@Component({
  selector: 'td:not(.zc-disabled-td)',
  templateUrl: './zc-td.component.html',
  styleUrls: ['./zc-td.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ZcTdComponent implements OnInit {
  @Input() zcChecked = false;
  @Input() zcDisabled = false;
  @Input() zcLeft: string;
  @Input() zcRight: string;
  @Input() zcAlign: 'left' | 'right' | 'center';
  constructor() { }

  ngOnInit() {
  }

}
