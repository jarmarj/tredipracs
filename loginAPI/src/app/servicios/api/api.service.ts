import { Injectable } from '@angular/core';
import { LoginInterface } from '../../modelos/login.interface'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
    console.log(headers);

    return this.http.post(apiURL, null, {
      headers,
      observe: 'response'
    })
      .pipe(
        /*
        *Tap para copiar la respuesta del post
        */

        // tap({
        //   next: (resp) => {
        //     console.log(resp);
        //     const token: string = resp.headers.get('authorization');
        //     // console.log(token);
        //     const tokenTemp = token.replace('Bearer ', '');
        //     console.log(tokenTemp);
        //     const info = jwt_decode(tokenTemp);
        //     console.log(info);

        //   }
        //   , error: (err) => {
        //     console.log(err);

        //   }
        // }),

        /*
        *Map devuelve solo el token ya decodificado
        */
        map((resp) => {
          // console.log(resp);
          const token: string = resp.headers.get('authorization');
          // console.log(token);
          sessionStorage.setItem('auth_token', token);

          const tokenTemp = token.replace('Bearer ', '');
          const info = jwt_decode(tokenTemp);
          console.log(info);
          return info;
        })
      );
  }

  /*
  session storage
  logout method
  */

  getHeader() {
    // console.log(sessionStorage.getItem('auth_token'));


    return new HttpHeaders({
      // Authorization: 'soyunaprueba'
      Authorization: sessionStorage.getItem('auth_token')
    });
  }

  getUsers(pagination: string) {
    const apiUrl = 'https://desa-api.tredibus.com/users'
      + '?'
      + pagination;

    // console.log(apiUrl);


    return this.http.get(
      apiUrl, {
      headers: this.getHeader(),
      // observe: 'response'
    }
    )
    .pipe(
      tap((data) => {
        console.log(data);
      })
    );
  }

}
