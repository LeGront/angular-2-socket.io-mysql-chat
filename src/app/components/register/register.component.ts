import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AlertService, UserService, AuthenticationService} from '../../_services/index';

@Component({
    templateUrl: './register.component.html'
})

export class RegisterComponent {
    model:any = {};
    loading = false;

    constructor(private router:Router,
                private userService:UserService,
                private authService:AuthenticationService,
                private alertService:AlertService) {
    }

    register() {
        this.loading = true;
        this.authService.register(this.model.nickname, this.model.password)
            .subscribe(
                data => {
                    if (data === this.model.nickname) {
                        this.alertService.success('Registration successful', true);
                        this.router.navigate(['/login']);
                    }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
