import { Injectable, signal } from '@angular/core'
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc'
import { environment } from '../../environment'
import { Subject } from 'rxjs'

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin,
  clientId: environment.googlePhotos.clientId,
  dummyClientSecret: environment.googlePhotos.clientSecret,
  scope:
    'openid profile email https://www.googleapis.com/auth/photoslibrary.readonly',
  strictDiscoveryDocumentValidation: false,
}

export interface UserInfo {
  info: {
    sub: string
    email: string
    name: string
    picture: string
  }
}

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  userProfileSubject = signal<UserInfo | undefined>(undefined)

  constructor(private oAuthService: OAuthService) {
    oAuthService.configure(oAuthConfig)
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if (!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow()
        } else {
          oAuthService.loadUserProfile().then((userProfile) => {
            console.log(JSON.stringify(userProfile))
            //this.userProfileSubject.next(userProfile as UserInfo)
            this.userProfileSubject.set(userProfile as UserInfo)
          })
        }
      })
    })
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken()
  }

  signIn() {
    this.oAuthService.tryLoginImplicitFlow().then(() => {
      if (!this.oAuthService.hasValidAccessToken()) {
        this.oAuthService.initLoginFlow()
      } else {
        this.oAuthService.loadUserProfile().then((userProfile) => {
          console.log(JSON.stringify(userProfile))
          //this.userProfileSubject.next(userProfile as UserInfo)
          this.userProfileSubject.set(userProfile as UserInfo)
        })
      }
    })
  }

  signOut() {
    console.log('Google API: Signing out.')
    this.oAuthService.logOut()
    //this.userProfileSubject.set(undefined)
  }

  getAccessToken() {
    return this.oAuthService.getAccessToken()
  }
}
