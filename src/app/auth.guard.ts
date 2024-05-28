import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EdutechService } from './edutech.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: EdutechService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getIsLoggedInStatus()=="yes") { 
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuard implements CanActivate {
  constructor(private eduService: EdutechService, private router: Router) {}

  canActivate(): boolean {
    console.log(this.eduService.isSocialLogin());
    if (this.eduService.isRegistrationComplete()=="yes" || this.eduService.isSocialLogin()=="yes") {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class SocialLoginGuard implements CanActivate {
  constructor(private eduService: EdutechService, private router: Router) {}

  canActivate(): boolean {
    if(this.eduService.isSocialLogin()=="yes") {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
