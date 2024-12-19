import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IAuthInfo } from '../../auth/auth.model';
import { AuthState } from '../../auth/auth.state';
import { IProfile } from '../../auth/profile.model';
@Component({
    templateUrl: './details.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, RouterModule]
})
export class ProfileDetailsComponent implements OnInit {


    profile$: Observable<IProfile>;
    constructor(private authState: AuthState) {
        //
    }
    ngOnInit(): void {
        this.profile$ = this.authState.stateItem$.pipe(map((auth: IAuthInfo) => auth.payload));
    }
}
