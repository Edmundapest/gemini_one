import { Injectable, inject } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs/internal/Observable'
import { GoogleApiService } from './google-api.service'

export const AccessGuardService: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const router: Router = inject(Router)
  //const tokenStorage: TokenStorageService = inject(TokenStorageService);
  //const tokenStorage = inject(this.oAuthService.hasValidAccessToken);
  const googleApi: GoogleApiService = inject(GoogleApiService)

  if (!googleApi.isLoggedIn()) {
    return router.navigate([''])
  } else {
    return true
  }

  //if (tokenStorage.isTokenExpired()) {
  //  return router.navigate(['forbidden']);
  //}
  //else {
  //  const roles = route.data['permittedRoles'] as Array<string>;
  //  const userRole = tokenStorage.getUserToken().role;
  //
  //  if (roles && !roles.includes(userRole)) {
  //    return router.navigate(['login']);
  //  }
  //  else
  //    return true;
  //}
}
