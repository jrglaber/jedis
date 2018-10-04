import { Component, OnInit, Input } from '@angular/core';
import { Jedi } from '../Jedi';
import { StatusService } from '../status.service';
import { Status } from '../Status';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-jedi',
  templateUrl: './jedi.component.html',
  styleUrls: ['./jedi.component.css']
})
export class JediComponent implements OnInit {
  @Input() jedi: Jedi;
  status: Observable<Status[]>;

  constructor(private statusService: StatusService) { }

  ngOnInit() {
    this.getStatus();
  }

  getStatus(): void {
    this.status = this.statusService.getStatus();
  }

}
