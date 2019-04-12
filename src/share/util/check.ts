import { IndexableObject } from '../types/indexable';
import { TemplateRef, Type } from '@angular/core';

export function isNotNil(value: any): boolean {
    return typeof value !== 'undefined' && value !== null;
}

export function isNil(value: any): value is null | undefined {
    return typeof value === 'undefined' || value === null;
}

export function shallowEqual(objA?: IndexableObject, objB?: IndexableObject): boolean {
    if (objA === objB) {
        return true;
    }
    if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
        return false;
    }
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

    for (let idx = 0; idx < keysA.length; idx++) {
        const key = keysA[idx];
        if (!bHasOwnProperty(key)) {
            return false;
        }
        if (objA[key] !== objB[key]) {
            return false;
        }
    }
    return true;
}

export function isInteger(value: string | number): boolean {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

export function isNonEmptyString(value: any): boolean {
    return typeof value === 'string' && value !== '';
}

export function isTemplateRef(value: any): boolean {
    return value instanceof TemplateRef;
}

export function isComponent(value: any): boolean {
    return value instanceof Type;
}
