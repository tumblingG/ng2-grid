import { Injectable, Inject } from '@angular/core';
import {IndexableObject} from "../types/indexable";
import {isNotNil} from "../until/check";
import {DOCUMENT} from '@angular/common/src/common';

@Injectable({
  providedIn: 'root'
})
export class SlMeasureScrollbarService {
  private _scrollbarWidth: number;
  private scrollBarMeasure: IndexableObject = {
    position: 'absolute',
    top: '-9999px',
    width: '50px',
    height: '50px',
    overflow: 'scroll'
  };

  get scrollBarWidth(): number {
    if (isNotNil(this._scrollbarWidth)) {
      return this._scrollbarWidth;
    }
    this.initScrollBarWidth();
    return this._scrollbarWidth
  }

  initScrollBarWidth(): void {
    const scrollDiv = this.document.createElement('div');
    for (const scrollProp in this.scrollBarMeasure) {
      if (this.scrollBarMeasure.hasOwnProperty(scrollProp)) {
        scrollDiv.style[scrollProp] = this.scrollBarMeasure[scrollProp];
      }
    }
    this.document.body.appendChild(scrollDiv);
    const width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.document.body.removeChild(scrollDiv);
    this._scrollbarWidth = width;
  }

  constructor(@Inject(DOCUMENT) private document: any) {
    this.initScrollBarWidth();
  }
}
