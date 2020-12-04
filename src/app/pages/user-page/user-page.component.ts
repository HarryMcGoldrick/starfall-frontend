import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Meteorite } from 'src/app/models/meteorite';
import { MeteoriteService } from '../../services/meteorite.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  favouriteMeteorites: Meteorite[] = []

  constructor(private meteoriteService: MeteoriteService) { }

  ngOnInit(): void {
    const { username } = JSON.parse(localStorage.getItem('userObj'));

    this.meteoriteService.getFavourites(username).pipe(
      mergeMap(res => {
        let favourites = res.map(id => this.meteoriteService.getMeteorite(id))
        console.log(favourites)
        return forkJoin(favourites)
      })
    ).subscribe(res => {
      this.favouriteMeteorites = res
    })
  }

}
