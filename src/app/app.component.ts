import { Component, OnInit } from '@angular/core'
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router'
import { GoogleApiService, UserInfo } from './google-api.service'
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
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
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
export class AppComponent {
  title = 'eden_gemini'
}
