import { Component, OnInit } from '@angular/core';

// window._  = require('lodash')
// window.$  = window.jQuery = require('jquery')

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dashboard';

  ngOnInit() {

  }

  setTitle(title: string): void {
    this.title = title;
  }
}
