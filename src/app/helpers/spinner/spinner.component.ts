import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
  showSpinner: boolean = false;

  constructor(public spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.spinnerService.showLoader.subscribe((res) => {
      this.showSpinner = res;
    });
  }
}
