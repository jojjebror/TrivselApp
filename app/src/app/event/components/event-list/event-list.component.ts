import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Event } from '../../../shared/models';

@Component({
  selector: 'ex-event-list',
  templateUrl: './event-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
  //styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {

  @Input() evs: Event[];

  constructor() { }

}
