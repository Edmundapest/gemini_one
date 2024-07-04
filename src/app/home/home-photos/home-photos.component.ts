import { Component, signal } from '@angular/core'
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop'
import { GooglePhotosService } from './google-photos.service'
import { GoogleApiService } from '../../google-api.service'

@Component({
  selector: 'app-home-photos',
  standalone: true,
  imports: [CdkDropList, CdkDrag],
  templateUrl: './home-photos.component.html',
  styleUrl: './home-photos.component.css',
})
export class HomePhotosComponent {
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ]

  //photos: any[] = []
  photos = signal<any[]>([])

  constructor(
    private googlePhotosService: GooglePhotosService,
    private googleApiService: GoogleApiService,
  ) {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.photos(), event.previousIndex, event.currentIndex)
  }

  ngAfterViewInit() {
    this.getPhotos()

    //effect(() => (this.userInfo = this.googleApi.userProfileSubject()))
  }

  async getPhotos() {
    if (this.googleApiService.isLoggedIn()) {
      const accessToken = this.googleApiService.getAccessToken()
      const response = await this.googlePhotosService.getPhotos(accessToken)
      this.photos.set(response.mediaItems)
      console.info('Printing photos array')
      console.info(this.photos())

      //this.googlePhotosService.getPhotos(accessToken).subscribe({
      //  next: (response: any) => {
      //    this.photos = response.mediaItems
      //    console.info('Printing photos array')
      //    console.info(this.photos)
      //  },
      //  error: (error: any) => {
      //    console.error('Error fetching photos: ', error)
      //  },
      //})
    } else {
      console.error('User is not logged in.')
      // Handle not logged in scenario, maybe redirect to login page.
    }
  }

  trackByPhotoId(index: number, photo: any): number {
    const id = photo().key // Replace with your unique identifier
    console.log('returning ' + id)
    return id
  }
}
