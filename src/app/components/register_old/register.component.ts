import {Component} from '@angular/core';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less']
})

export class RegisterComponent {
    username:string;
    password:string;
    password2:string;
    message:string;

    alertMessage() {
    }

    guideMessage(stage) {
        switch (stage) {
            case 1:
                this.message = 'Да, с имени и нужно начинать';
                break;
            case 2:
                this.message = 'Молодец, теперь пароль';
                break;
            case 3:
                if (this.password === this.password2) {
                    this.message = 'Красава, пароли совпали, жми "Регистрироваться"!';
                } else {
                    this.message = 'Давай, ещё разок пароль вводи...';
                }
                break;
        }

    }
}