import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Meteorite } from 'src/app/models/meteorite';
import { MeteoriteService } from '../../services/meteorite.service';

@Component({
  selector: 'app-user-favourites',
  templateUrl: './user-favourites.component.html',
  styleUrls: ['./user-favourites.component.scss']
})
export class UserFavouritesComponent implements OnInit {
  favouriteMeteorites: Meteorite[] = [];
  isLoading = true;
  constructor(private meteoriteService: MeteoriteService) { }

  ngOnInit(): void {
    const { username } = JSON.parse(localStorage.getItem('userObj'));

    this.meteoriteService.getFavourites(username).pipe(
      mergeMap(res => {
        this.isLoading = true;
        const favourites = res.map(id => this.meteoriteService.getMeteorite(id));
        return forkJoin(favourites);
      })
    ).subscribe(res => {
      this.favouriteMeteorites = res;
      this.isLoading = false;
    });
  }

}
