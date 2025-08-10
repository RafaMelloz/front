import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { authState } from 'rxfire/auth';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const auth = inject(Auth);

    return authState(auth).pipe(
        take(1),
        map(user => !!user || router.createUrlTree(['/login']))
    );
};