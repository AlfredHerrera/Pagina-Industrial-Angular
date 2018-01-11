import { Component, OnInit } from '@angular/core';
declare var $:JQueryStatic;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor() {
    this.nav();
   }

  ngOnInit() {
  }

  nav(){
    "use strict";
    $(window).bind("load resize", function() {
      var topOffset = 33;
      var width = (window.innerWidth > 0) ? window.innerWidth :
        screen.width;
      if (width < 768) {
        topOffset = 100;
      }
      $('div.navbar-collapse').removeClass('collapse');
      var height = ((window.innerHeight > 0) ? window.innerHeight :
        screen.height) - 1;
      height = height - topOffset;
      if (height < 1) height = 1;
      if (height > topOffset) {
        $("#sidebar").css("min-height", (height) + "px");
      }
    });
  }
}
