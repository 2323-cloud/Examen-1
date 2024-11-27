import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plato, Platos } from '../interface/platos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {
  url = 'http://localhost:3000/api/restaurante'
  constructor(private http:HttpClient) { }

  getPlatos(): Observable<Platos> {
    return this.http.get<Platos>(`${this.url}`);
  }

  postPlatos(elemento:Plato): Observable<Plato>{
    return this.http.post<Plato>(`${this.url}`, elemento)
  }

  putPlatos(id:string, elemento:Plato): Observable<Plato>{
    return this.http.put<Plato>(`${this.url}/${id}`, elemento)
  }

  deletePlato(id:string): Observable<Plato>{
    return this.http.delete<Plato>(`${this.url}/${id}`)
  }
}
