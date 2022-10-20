import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '3kNkh5cBCZIZA0TwYc7WgwKQr4QGG0B0';
  private _historial: string[] = [];

  //TODO cambiar an por su tipo correspondiente
  public resultados: any[] = [];
  
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

    const url = `http://api.giphy.com/v1/gifs/search?api_key=3kNkh5cBCZIZA0TwYc7WgwKQr4QGG0B0&q=${ query }&limit=10`;

    this.http.get( url ).subscribe( (response: any) => {  
      console.log( response.data );
      this.resultados = response.data;
    })
  }

}
