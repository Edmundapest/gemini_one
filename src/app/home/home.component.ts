import { Component, effect, signal } from '@angular/core'
import { initFlowbite } from 'flowbite'
import { GoogleApiService, UserInfo } from '../google-api.service'
import { Router, RouterOutlet } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userInfo?: UserInfo
  //userInfo = signal<UserInfo | null>(null)
  protected userProfileState: 'left' | 'right' = 'right'

  constructor(
    private router: Router,
    private readonly googleApi: GoogleApiService,
  ) {
    effect(() => (this.userInfo = this.googleApi.userProfileSubject()))
  }

  ngAfterViewInit() {
    initFlowbite()
  }

  logout() {
    this.googleApi.signOut()
    this.router.navigate([''])
  }

  click_photos() {
    this.router.navigate([`/home/photos`])
  }

  click_dashboard() {
    this.router.navigate(['./home'])
  }
}
