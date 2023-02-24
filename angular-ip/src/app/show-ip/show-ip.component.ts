import { Component } from '@angular/core';
import { IpService } from '../ip.service';

@Component({
  selector: 'app-show-ip',
  templateUrl: './show-ip.component.html',
  styleUrls: ['./show-ip.component.css'],
})
export class ShowIpComponent {
  public ip?: string;

  constructor(private ipService: IpService) {}

  ngOnInit() {
    this.ipService.getIpAdress().subscribe((data: any) => {
      this.ip = data.ip.slice(0, 4) + ' ...';
    });
  }
}
