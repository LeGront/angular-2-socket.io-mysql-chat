import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {AlertService, AuthenticationService} from '../../_services/index';
import {IUser} from '../../../../models/models';

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    model:any = {};
    // model:IUser;
    loading = false;
    returnUrl:string;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private authService:AuthenticationService,
                private alertService:AlertService) {
    }

    ngOnInit() {
        // reset login status
        this.authService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authService.login(this.model.nickname, this.model.password)
            .subscribe(
                (data: any) => {
                    // console.log(data);
                    if(data.success === true && data.user.nickname === this.model.nickname){
                        this.alertService.success('Auth successful', true);
                        localStorage.setItem('currentUser', JSON.stringify(data.user));
                        this.router.navigate(['/']);
                        this.loading = false;
                    } else {
                        this.alertService.error('Auth falied', true);
                        this.router.navigate(['/login']);
                        this.loading = false;
                    }
                    // if (data === this.model.nickname) {
                    //     this.alertService.success('Auth successful', true);
                        // this.router.navigate(['/login']);
                    // } else {
                    //
                    // }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }


    // login() {
    //     this.loading = true;
    //     this.authenticationService.login(this.model.nickname, this.model.password)
    //         .subscribe(
    //             data => {
    //                 this.router.navigate([this.returnUrl]);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
    // }
}
