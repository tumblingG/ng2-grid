import { Directive, TemplateRef, EmbeddedViewRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[slStringTemplateOutlet]'
})
export class StringTemplateOutletDirective {
  private isTemplate: boolean;
  private inputTemplate: TemplateRef<void> | null = null;
  private inputViewRef: EmbeddedViewRef<void> | null = null;
  private defaultViewRef: EmbeddedViewRef<void> | null = null;

  constructor(
      private viewContainer: ViewContainerRef,
      private defaultTemplate: TemplateRef<void>
  ) { }

  @Input()
  set slStringTemplateOutlet(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.isTemplate = true;
      this.inputTemplate = value;
    } else {
      this.isTemplate = false;
    }
    this.updateView();
  }

  updateView(): void {
    if (!this.isTemplate) {
      /** 使用默认模版当输入元素是字符串的时候 **/
      if (!this.defaultViewRef) {
        this.viewContainer.clear();
        this.inputViewRef = null;
        if (this.defaultTemplate) {
          this.defaultViewRef = this.viewContainer.createEmbeddedView(this.defaultTemplate);
        }
      }
    } else {
      /** 使用输入模版当输入元素是模版的时候 **/
      if (!this.inputViewRef) {
        this.viewContainer.clear();
        this.defaultViewRef = null;
        if (this.inputTemplate) {
          this.inputViewRef = this.viewContainer.createEmbeddedView(this.inputTemplate);
        }
      }
    }
  }

}
