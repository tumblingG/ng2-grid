import { Injectable } from '@angular/core';
import {TableUtilService} from "./table-util.service";

@Injectable()
export class TableOptionsService {
  constructor(private tableUtil: TableUtilService) {

  }
  initialize(baseOptions) {
    baseOptions.columnDefs = baseOptions.columnDefs || [];
    baseOptions.uid = baseOptions || '$$hashKey';
    const rowIdentity = baseOptions.rowIdentity;
    baseOptions.rowIdentity = ((row) => {
      if (!row.$$hashkey) {
        if (typeof rowIdentity === 'function') {
          row.$$hashkey = rowIdentity(row);
        } else {
          this.tableUtil.hashKey(row)
        }
      }
      return row.$$hashkey;
    });
    baseOptions.getRowIdentity = baseOptions.getRowIdentity || ((row) => {
      return row.$$hashkey;
    });

    baseOptions.rowHeight = baseOptions.rowHeight || 30;
    baseOptions.rowEquality = baseOptions.rowEquality || ((entityA, entityB) => {
      return entityA === entityB;
    });
    return baseOptions;
  }
}
