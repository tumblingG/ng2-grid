import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'ng2-table';
  total = 200;
  pageSize = 10;
  pageIndex = 2

  addIndex() {
    this.pageIndex++;
  }
  addTotal() {
    this.total++;
  }
  modeChange($event: number) {
    console.log(`ni ${$event}`);
  }
}

