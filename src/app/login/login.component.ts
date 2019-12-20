import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { LocalStorageService } from '../localStorageService';
import { Subject } from 'rxjs';

export interface IUser {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentUser: IUser = null;
  localStorageService: LocalStorageService<IUser>;
  user: IUser = { username: '', password: '' };
  constructor(private router: Router, private toastService: ToastService) {
    this.localStorageService = new LocalStorageService('user');
  }

  ngOnInit() {

  }

  login(user: IUser) {
    const defaultUser: IUser = { username: 'victor', password: 'victor123' };
    if (user.username !== '' && user.password !== '') {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
        this.localStorageService.saveItemsToLocalStorage(user);
        this.router.navigate(['cart', user]);
      } else {
        this.toastService.showToast('danger', 2000, 'Login failed! Username or password may be incorrect.');
      }
    } else {
      this.toastService.showToast('danger', 2000, 'Login failed! Must enter username and password.');
    }

  }





}
