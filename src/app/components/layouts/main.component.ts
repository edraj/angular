import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';

@Component({
  templateUrl: './main.component.html',
  standalone: true,
  imports: [TranslatePipe, RouterModule],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
