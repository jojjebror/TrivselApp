import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Office } from 'src/app/shared/models';

@Component({
  selector: 'ex-office-detail',
  templateUrl: './office-detail.component.html',
  styleUrls: ['./office-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficeDetailComponent implements OnInit {
  @Input() office: Office;

  constructor() {}

  ngOnInit() {}
}
