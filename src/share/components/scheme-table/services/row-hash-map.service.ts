import { Injectable } from '@angular/core';

@Injectable()
export class RowHashMapService {
  objMap: Map<any, any>;
  options: {[index: string] :any};

  /**
   * 初始化options，需要使用到用户配置的options
   * @param options
   */
  initialize(options) {
    this.options = options;
  }

  /**
   * 添加
   * @param key
   * @param value
   */
  add(value) {
    const _key = this.options.rowIdentity(value);
    const entity = {checked: false, value};
    this.objMap.set(_key, entity);
  }

  /**
   * 根据key获取数据
   * @param key
   */
  get(key) {
    const _key = this.options.rowIdentity(key);
    return this.objMap.get(_key);
  }

  /**
   * 移除单条数据
   * @param key
   */
  remove(key) {
    const _key = this.options.rowIdentity(key);
    return this.objMap.delete(_key);
  }

  /**
   * 清除所有map数据
   */
  clear() {
    this.objMap.clear();
  }
  constructor() {
    this.objMap = new Map();
  }
}
