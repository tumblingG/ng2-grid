import { Injectable, forwardRef, Inject } from '@angular/core';
import {TableUtilService} from "./table-util.service";

@Injectable()
export class TableOptionsService {
  private _options: {[index: string]: any};
  get options() {
    if (!this._options) throw new Error('Must initialize TableOptionsService');
    return this._options;
  }
  constructor(private tableUtil: TableUtilService) {
  }

  initialize(baseOptions) {
    baseOptions.columnDefs = baseOptions.columnDefs || [];
    baseOptions.uid = baseOptions || '$$hashKey';
    const rowIdentity = baseOptions.rowIdentity;
    baseOptions.rowIdentity = ((row) => {
      if (typeof rowIdentity === 'function') {
         return rowIdentity(row);
      } else {
        return this.tableUtil.nextUid();
      }
    });
    baseOptions.getRowIdentity = baseOptions.getRowIdentity || ((row) => {
      return row.$$hashKey;
    });

    baseOptions.rowHeight = baseOptions.rowHeight || 30;
    baseOptions.rowEquality = baseOptions.rowEquality || ((entityA, entityB) => {
      return entityA === entityB;
    });
    this._options = baseOptions;
  }
}
