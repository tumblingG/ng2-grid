import { Injectable } from '@angular/core';
import {TableOptionsService} from "./table-options.service";

@Injectable()
export class HashKeyService {

  constructor(private tableOptionsService: TableOptionsService) { }

  /**
   * 为obj生成唯一标识$$hashKey
   * @param obj
   */
  generateKey(obj): void {
    const objType = typeof obj;
    const { options } = this.tableOptionsService;
    if (objType === 'object' && obj !== null && !obj['$$hashKey']) {
      obj['$$hashKey'] = options.rowIdentity(obj);
    }
  }
}
