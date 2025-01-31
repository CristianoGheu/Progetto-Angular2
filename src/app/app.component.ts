import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }
  title = 'progetto-angular2-gheuCristiano';
}
