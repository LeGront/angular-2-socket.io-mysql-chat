"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var LoginComponent = (function () {
    function LoginComponent(route, router, authService, alertService) {
        this.route = route;
        this.router = router;
        this.authService = authService;
        this.alertService = alertService;
        this.model = {};
        // model:IUser;
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authService.login(this.model.nickname, this.model.password)
            .subscribe(function (data) {
            // console.log(data);
            if (data.success === true && data.user.nickname === _this.model.nickname) {
                _this.alertService.success('Auth successful', true);
                localStorage.setItem('currentUser', JSON.stringify(data.user));
                _this.router.navigate(['/']);
                _this.loading = false;
            }
            else {
                _this.alertService.error('Auth falied', true);
                _this.router.navigate(['/login']);
                _this.loading = false;
            }
            // if (data === this.model.nickname) {
            //     this.alertService.success('Auth successful', true);
            // this.router.navigate(['/login']);
            // } else {
            //
            // }
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            templateUrl: './login.component.html'
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map