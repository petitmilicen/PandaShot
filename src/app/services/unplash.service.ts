import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnplashService {

  private apiUrl = 'https://api.unsplash.com';
  private accessKey = '52twWPPUZcpjHj8Wg_9Wi2mSWXRKafNB-5HLfiYxqjo';

  constructor(private http: HttpClient) {}

  getRandomPhoto(): Observable<any> {
    return this.http.get(`${this.apiUrl}/photos/random?client_id=${this.accessKey}`)
  }

}
