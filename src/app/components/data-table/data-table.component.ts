import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Meteorite } from 'src/app/models/meteorite';
import { MeteoriteService } from 'src/app/services/meteorite.service';




@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'recclass', 'mass', 'geolocation', 'year'];
  dataSource: Meteorite[];
  loading = true;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private meteoriteService: MeteoriteService) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    // Retrieve the count of all meteorites in the database for paginating them
    this.meteoriteService.getMeteoriteCount().subscribe(len => this.length = len);

    // On pagination retrieve a list of results according to the pageIndex and pageSize
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.meteoriteService.getAllMeteoritesPaginated(this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          return data;
        })
      ).subscribe(data => this.dataSource = data);
  }

  // Used to update the paginator settings
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }


}
