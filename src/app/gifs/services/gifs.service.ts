import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '3kNkh5cBCZIZA0TwYc7WgwKQr4QGG0B0';
  private _historial: string[] = [];
  private url: string = 'http://api.giphy.com/v1/gifs/search?api_key=3kNkh5cBCZIZA0TwYc7WgwKQr4QGG0B0&q=travolta&limit=10';

  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {}

  buscarGifs( query: string = ''){

    query = query.trim().toLowerCase();
    
    if( !this._historial.includes(query) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }    

    this.http.get( this.url ).subscribe( (response: any) => {  
      console.log( response.data );
    })
  }

}
