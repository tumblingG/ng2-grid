import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, QueryList, ContentChildren, Host, Optional,
  ElementRef,
  Renderer2,
  ViewChild,
  TemplateRef,
  AfterViewInit} from '@angular/core';
import { SlThComponent } from '../sl-th/sl-th.component';
import {TableComponent} from "../sl-table/table.component";

@Component({
  selector: 'sl-thead',
  templateUrl: './sl-thead.component.html',
  styleUrls: ['./sl-thead.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlTheadComponent implements OnInit {
  @ViewChild('contentTemplate') templateRef: TemplateRef<void>;
  @ContentChildren(SlThComponent, {descendants: true}) listOfNzThComponent: QueryList<SlThComponent>;
  constructor(
      @Host() @Optional() public tableComponent: TableComponent,
      private elementRef: ElementRef,
      private renderer: Renderer2
  ) {
    if (this.tableComponent) {
      this.tableComponent.theadComponent = this;
    }
  }

  ngOnInit() {
  }

  // ngAfterViewInit(): void {
  //   if (this.tableComponent) {
  //     this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
  //   }
  // }
}
