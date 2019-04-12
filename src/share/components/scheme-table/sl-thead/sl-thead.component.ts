import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, QueryList, ContentChildren, Host, Optional,
  ElementRef,
  Renderer2,
  ViewChild,
  TemplateRef} from '@angular/core';
import { SlThComponent } from '../sl-th/sl-th.component';
import {SlTableComponent} from "../sl-table/sl-table.component";
@Component({
  selector: 'app-sl-thead',
  templateUrl: './sl-thead.component.html',
  styleUrls: ['./sl-thead.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlTheadComponent implements OnInit {
  @ViewChild('contentTemplate') templateRef: TemplateRef<void>;
  @ContentChildren(SlThComponent, {descendants: true}) listOfNzThComponent: QueryList<SlThComponent>;
  constructor(
      @Host() @Optional() public slTableComponent: SlTableComponent,
      private elementRef: ElementRef,
      private renderer: Renderer2
  ) {
    if (this.slTableComponent) {
      this.slTableComponent.slTheadComponent = this;
    }
  }

  ngOnInit() {
  }

}
