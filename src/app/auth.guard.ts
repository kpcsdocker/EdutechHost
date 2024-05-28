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
      console.log(this.authService.getIsLoggedInStatus());
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
