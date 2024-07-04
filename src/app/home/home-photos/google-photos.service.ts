import { Injectable, signal } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class GooglePhotosService {
  private baseUrl = 'https://photoslibrary.googleapis.com/v1/mediaItems'
  //photos_array = signal<any>(null)

  constructor(private http: HttpClient) {}

  async getPhotos(accessToken: string): Promise<any> {
    //const options = new HttpParams().set('pageSize', '100')
    //const headers = new HttpHeaders({
    //  Authorization: `Bearer ${accessToken}`,
    //})
    //var photos_array = await this.http.get<any>(this.baseUrl, {
    //  headers: headers,
    //  params: options,
    //})

    //const options = {
    //  pageSize: '100',
    //}
    const options = new URLSearchParams({ pageSize: '100' })
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    const response = await fetch(`${this.baseUrl}?${options}`, {
      headers: headers,
    })

    const photos_array = await response.json()
    //this.photos_array.set(await response.json())
    return photos_array
  }
}
