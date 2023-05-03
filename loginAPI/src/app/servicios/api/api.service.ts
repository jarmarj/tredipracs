import { Injectable } from '@angular/core';
import { LoginInterface } from '../../modelos/login.interface'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { tokenSession } from './tokenSession';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  sessionToken = new tokenSession();

  constructor(private http: HttpClient) { }

  loginWithEmail(form: LoginInterface): Observable<any> {
    const apiURL = 'https://desa-api.tredibus.com/auth/login'

    /**
    * Buffer no se recnoce, no pude hacer que funcionara asi que uso la forma deprecada 
    */
    const stringCredenctials = btoa(`${form.email}:${form.password}`)
    // let string = global.Buffer.from(`${form.email}:${form.password}`).toString('base64')

    const headers = new HttpHeaders({
      Authorization: `Basic ${stringCredenctials}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(apiURL, null, {
      headers,
      observe: 'response'
    })
      .pipe(
        /*
        *Tap para copiar la respuesta del post
        */

        tap({
          next: (resp) => {
            const token: string = resp.headers.get('authorization');
            const tokenTemp = token.replace('Bearer ', '');
            this.sessionToken.sessionToken = tokenTemp;
            const info = jwt_decode(tokenTemp);

          }
          , error: (err) => {
            console.log(err);

          }
        }),

        /*
        *Map devuelve solo el token ya decodificado
        */
        map((resp) => {
          const token: string = resp.headers.get('authorization');
          // sessionStorage.setItem('auth_token', token);

          const tokenTemp = token.replace('Bearer ', '');
          const info = jwt_decode(tokenTemp);
          return info;
        })
      );
  }

  /*
  session storage
  logout method
  */

  getHeader() {

    console.log(this.sessionToken.getSessionToken);
    
    return new HttpHeaders({
      // Authorization: 'soyunaprueba'
      Authorization: 'Bearer ' + this.sessionToken.getSessionToken
    });
  }

  getUsers(page:{limit:number, offset:number}) {
    const apiUrl = 'https://desa-api.tredibus.com/users'
      + '?limit='
      + page.limit
      + '&offset='
      + page.offset;

    
    return this.http.get(
      apiUrl, {
      headers: this.getHeader(),
      observe: 'response'
    }
    )
      .pipe(
        map(
          (resp) => {
            const token: string = resp.headers.get('authorization');
            const tokenTemp = token.replace('Bearer ', '');
            this.sessionToken.sessionToken = tokenTemp;
            const info = jwt_decode(tokenTemp);
            console.log(resp.body);
            
            return resp.body;
          })
      );
  }

  
}
