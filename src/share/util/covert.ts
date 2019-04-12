import { coerceBooleanProperty, coerceCssPixelValue, _isNumberValue } from '@angular/cdk/coercion';
import { FunctionProp } from '../types/common-wrap';

export function toBoolean(value: number | string): boolean {
    return coerceBooleanProperty(value);
}

export function toNumber(value: number | string): number;
export function toNumber<D>(value: number | string, fallback: D): number | D;
export function toNumber(value: number| string, fallbackValue: number = 0): number {
    return _isNumberValue(value) ? Number(value) : fallbackValue;
}

export function toCssPiexl(value: number | string): string {
    return coerceCssPixelValue(value);
}

export function valueFunctionProp<T>(prop: FunctionProp<T>, ...args: any[]): T {
    return typeof prop === 'function' ? prop(...args) : prop
}

function propDecoratorFactory<T, D>(name: string, fallback: (v: T) => D): (target: any, propName: string) => void {
    function propDecorator(target: any, propName: string): void {
        const privatePropName = `$$_${propName}`;

        if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
            console.warn(`The prop "${privatePropName}" is already exist, it will be override by ${name} decorator.`);
        }

        Object.defineProperty(target, privatePropName, {
            configurable: true,
            writable: true
        });

        Object.defineProperty(target, propName, {
            get(): string {
                return this[privatePropName];
            },
            set(value: T): void {
                this[privatePropName] = fallback(value);
            }
        })
    }

    return propDecorator;
}

export function InputBoolean(): any {
    return propDecoratorFactory('InputBoolean', toBoolean);
}

export function InputCssPixel(): any {
    return propDecoratorFactory('InputCssPixel', toCssPiexl);
}

export function InputNumber(): any {
    return propDecoratorFactory('InputNumber', toNumber);
}
