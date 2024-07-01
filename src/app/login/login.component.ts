import { Component, OnInit, effect, signal } from '@angular/core'
import { ChildrenOutletContexts, Router, RouterOutlet } from '@angular/router'
import { GoogleApiService, UserInfo } from '../google-api.service'
import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('openClose', [
      state('left', style({ transform: 'translateX(-40%' })),
      state('right', style({ transform: 'translateX(0%' })),
      state('closed', style({ transform: 'translateX(120%' })),
      state('open', style({ transform: 'translateX(0%' })),
      transition('left <=> right', [animate('1s ease-in')]),
    ]),
    trigger('routeAnimations', [
      transition('LandingPage <=> HomePage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '-100%' })], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(
            ':leave',
            [animate('300ms ease-out', style({ left: '100%' }))],
            { optional: true },
          ),
          query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
            optional: true,
          }),
        ]),
      ]),
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
            }),
          ],
          { optional: true },
        ),
        query(':enter', [style({ left: '-100%' })], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(
            ':leave',
            [animate('200ms ease-out', style({ left: '100%', opacity: 0 }))],
            { optional: true },
          ),
          query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
            optional: true,
          }),
          query('@*', animateChild(), { optional: true }),
        ]),
      ]),
    ]),
  ],
})
export class LoginComponent {
  userInfo?: UserInfo
  //userInfo = signal<UserInfo | null>(null)
  protected userProfileState: 'left' | 'right' = 'right'
  textValue = signal('Debug')

  constructor(
    private readonly googleApi: GoogleApiService,
    private contexts: ChildrenOutletContexts,
    private router: Router,
  ) {
    //googleApi.userProfileSubject.subscribe((info) => {
    //  this.userInfo.set(info)
    //})
    effect(() => (this.userInfo = this.googleApi.userProfileSubject()))
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ]
  }

  isLoggedIn(): boolean {
    var loggedin = this.googleApi.isLoggedIn()
    console.log('Logged in ' + loggedin)
    return loggedin
  }

  login() {
    this.googleApi.signIn()
  }

  logout() {
    this.googleApi.signOut()
  }

  toggleUserProfileState(): 'left' | 'right' {
    if (this.userProfileState == 'left') {
      return 'right'
    } else {
      return 'left'
    }
  }

  proceed() {
    this.router.navigate(['./home'])
  }

  click(): void {
    this.textValue.set('New value!!' + Math.floor(Math.random() * 10))
  }
}
