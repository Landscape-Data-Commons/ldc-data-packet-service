import { Component, OnInit } from '@angular/core';
import { DownloadService } from '../services/download.service';

@Component({
  selector: 'app-download-request',
  templateUrl: './download-request.component.html',
  styleUrls: ['./download-request.component.scss']
})
export class DownloadRequestComponent implements OnInit {

  error: string;

  constructor(private downloadService: DownloadService) { }

  onSubmit() {
    this.downloadService.requestDownload({"PrimaryKeys": ["17101012114127892017-09-01"]})
      .subscribe(
        data => console.log(data), //this.router.navigate(['/timesheets'])
        error => this.error = error.statusText
      );
  }

  ngOnInit() {
  }

}
