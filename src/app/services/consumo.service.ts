import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consumo } from '../models/consumo';

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  private apiUrl = 'http://localhost:8080/consumos';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Consumo[]> {
    return this.http.get<Consumo[]>(this.apiUrl);
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  public save(consumo: Consumo): Observable<Consumo> {
    if (consumo.id) {
      return this.http.put<Consumo>(`${this.apiUrl}/${consumo.id}`, consumo);
    } else {
      return this.http.post<Consumo>(this.apiUrl, consumo);
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
