import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private user = {
    name: 'test',
    role: 'DOCENTE',
    email: 'docente@gmail.com',
    avatar: 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png'
  };

  getUser() {
    return this.user;
  }
}

