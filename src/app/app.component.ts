import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderPartial } from './lib/loader/loader.partial';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderPartial],
  template: '<http-loader></http-loader><router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(
  ) {

    _seqlog('app component');

  }
}
