import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'training-rampup-angular';

  constructor(private socket: Socket, private _toastService: ToastService) {}

  ngOnInit() {
    this.socket.on('connect', () => {
      console.log('connected with ID : ' + this.socket.ioSocket.id);

      this.socket.fromEvent('notification').subscribe(data => {
        this._toastService.info(data as string);
      });
    });
  }
}
