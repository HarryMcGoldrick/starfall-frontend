import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-map-filter',
  templateUrl: './map-filter.component.html',
  styleUrls: ['./map-filter.component.scss']
})
export class MapFilterComponent implements OnInit {
  @Output() triggerFiltering = new EventEmitter<any>();
  @Output() triggerFavourites = new EventEmitter<any>();
  filterForm = new FormGroup({
    name: new FormControl(''),
    classification: new FormControl(''),
    mass: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
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

    const { name, classification, mass } = this.filterForm.value;
    const formBody = {
      name,
      classification,
      mass,
      startDate,
      endDate
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
}
