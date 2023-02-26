import { Component } from '@angular/core';
import { Markers } from '../marker';
import { MarkersService } from '../markers.service';
import { WorldcitiesService } from '../worldcities.service';
import { WorldCity } from '../worldCity';

@Component({
  selector: 'app-marqueurs',
  templateUrl: './marqueurs.component.html',
  styleUrls: ['./marqueurs.component.css']
})

export class MarqueursComponent {
  allMarqueurs: Markers[] = [];
  marqueur!: Markers;
  city!: WorldCity;

  //for manage page
  p: number = 1;

  constructor(
    private markersService: MarkersService,
    private worldCitiesService: WorldcitiesService,
  ){}

  ngOnInit(): void{
    this.getAllMerkers();
  }

  getAllMerkers(): void {
    this.markersService.getAllMarkers().subscribe({
      next: (markersFromObservable) => {
        this.allMarqueurs = markersFromObservable;
        console.log('All merkers datas retrieved: ', markersFromObservable);
      },
      error: (error) => console.error(error),
      complete: () => console.log('Completed'),
    });
  }

  deleteMerker(marquer: Markers): void{
    this.allMarqueurs = this.allMarqueurs.filter((m) => m !== marquer);
    const id = marquer.id !== undefined ? marquer.id : 0;
    marquer.id = id;
    this.markersService.deleteMarker(marquer.id).subscribe();
  }
}
