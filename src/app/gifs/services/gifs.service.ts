import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '3kNkh5cBCZIZA0TwYc7WgwKQr4QGG0B0';
  private _historial: string[] = [];
  private url: string = 'http://api.giphy.com/v1/gifs';
  
  public resultados: Gif[] = [];
  
  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {

    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];

  }

  buscarGifs( query: string = ''){

    query = query.trim().toLowerCase();
    
    if( !this._historial.includes(query) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }    

    

    const params = new HttpParams()
      .set( 'api_key', this.apiKey )
      .set( 'limit', '10' )
      .set( 'q', query );


    this.http.get<SearchGifsResponse>( `${ this.url }/search`, { params } )
    .subscribe( (response ) => {  
      this.resultados = response.data;
      localStorage.setItem('resultados', JSON.stringify(response.data));
    })
  }
}
