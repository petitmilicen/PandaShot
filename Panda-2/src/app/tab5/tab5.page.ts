import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  notifications: any[] = [
    {
      userAvatarUrl: 'https://i.pinimg.com/564x/a9/a5/b7/a9a5b7f1fc099ab24cf89f9fbd62b1e4.jpg',
      title: 'Rukia',
      message: 'Te ha comenzado a seguir',
      fecha: '20:03 29/08/2023',
    },
    {
      userAvatarUrl: 'https://i.pinimg.com/564x/ce/31/08/ce31080c26caea0bc51f391bc520db2d.jpg',
      title: 'Mirai',
      message: 'Le dio me gusta a la imagen que compartiste',
      fecha: '21:33 23/08/2023',
    },
    {
      userAvatarUrl: 'https://i.pinimg.com/236x/5f/db/01/5fdb0188dd857129a432b6a0bc875cc7.jpg',
      title: 'Kallen',
      message: 'Le dio me gusta a la imagen que compartiste',
      fecha: '21:33 23/08/2023',
    },
    {
      userAvatarUrl: 'https://i.pinimg.com/236x/1a/8e/aa/1a8eaa790174f889b856a40c17271b3a.jpg',
      title: 'Hinata',
      message: 'Le dio me gusta a la imagen que compartiste',
      fecha: '21:33 23/08/2023',
    },
  ];

  constructor() {}

  ngOnInit() {}
}