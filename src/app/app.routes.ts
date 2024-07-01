import { Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { AccessGuardService } from './access-guard.service'
import { HomeDashboardComponent } from './home/home-dashboard/home-dashboard.component'
import { HomePhotosComponent } from './home/home-photos/home-photos.component'

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { animation: 'LoginPage' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { animation: 'HomePage' },
    children: [
      {
        path: '',
        component: HomeDashboardComponent,
        data: { animation: 'HomeDashboardPage' },
      },
      {
        path: 'dashboard',
        component: HomeDashboardComponent,
        data: { animation: 'HomeDashboardPage' },
      },
      {
        path: 'photos',
        component: HomePhotosComponent,
        data: { animation: 'HomePhotosPage' },
      },
    ],
  },
]
