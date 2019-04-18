import { Injectable, forwardRef, Inject } from '@angular/core';
import { TableOptionsService } from './table-options.service';

@Injectable()
export class TableUtilService {
  private seedId: number;
  private uid = ['0', '0', '0', '0'];
  private uidPrefix = 'row';
  constructor() {
    this.seedId = new Date().getTime();
  }

  /**
   * 获取唯一的标识
   */
  newId() {
    return this.seedId += 1;
  }

  /**
   * 重置uid
   */
  resetUids() {
    this.uid = ['0', '0', '0', '0'];
  }

  /**
   * 获取唯一的递增的ID
   */
  nextUid() {
    let index = this.uid.length;
    let digit;

    while(index) {
      index--;
      digit = this.uid[index].charCodeAt(0);
      if (digit === 57) { //'9'
        this.uid[index] = 'A';
        return this.uidPrefix + this.uid.join('');
      }
      if (digit === 90) { //'Z'
        this.uid[index] = '0';
      } else {
        this.uid[index] = String.fromCharCode(digit + 1);
        return this.uidPrefix + this.uid.join('');
      }
    }
    this.uid.unshift('0');
    return this.uidPrefix + this.uid.join('');
  }

}
