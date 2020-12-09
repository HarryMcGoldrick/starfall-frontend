import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MeteoriteService } from 'src/app/services/meteorite.service';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss']
})
export class MapFilterComponent implements OnInit {
  @Output() triggerFiltering = new EventEmitter<any>();
  @Output() triggerFavourites = new EventEmitter<any>();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  filterForm = new FormGroup({
    name: new FormControl(''),
    classification: new FormControl(''),
    fall: new FormControl(''),
    minMass: new FormControl(0, Validators.min(0)),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    meteoriteAmount: new FormControl(100)
  });

  constructor(private meteoriteService: MeteoriteService) { }

  ngOnInit(): void {
    this.meteoriteService.getAllClassifications().subscribe(value => {
      this.options = value;
    })
    this.filteredOptions = this.filterForm.controls.classification.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  onSubmit(): void {
    let startDate, endDate;
    // Need to convert date into a standardised format for the API to parse
    if (this.filterForm.value.startDate) {
      startDate = new Date(this.filterForm.value.startDate._d).toISOString();
    }
    if (this.filterForm.value.endDate) {
      endDate = new Date(this.filterForm.value.endDate._d).toISOString();
    }

    let { name } = this.filterForm.value;
    const { classification, mass, meteoriteAmount, fall } = this.filterForm.value;

    //Names in db are in title case
    name = this.titleCase(name);
    const formBody = {
      name,
      classification,
      fall,
      mass,
      startDate,
      endDate,
      meteoriteAmount
    }

    const queryString = this.createQueryStringFromObject(formBody)
    this.triggerFiltering.emit(queryString);

    //Prevent spam requests
    this.filterForm.disable();
    setTimeout(() => {
      this.filterForm.enable();
    }, 2000)
  }

  //Creates a query string using the formbody attributes, removes undefined or empty variables and parses them into the correct format
  createQueryStringFromObject(obj) {
    return Object.entries(obj).filter(([key]) => {
      if (obj[key] != '' || obj[key] != undefined) {
        return obj[key]
      }
    }).map(([key, val]) => `${key}=${val}`).join("&");
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  //Covert a string to title case
  titleCase(str) {
    return str.replace(/\w\S*/g, (t) => { return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase() });
  }
}
