import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Nutricionista } from '../models/nutricionista';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NutricionistaService {

  private apiUrl = 'http://localhost:8080/nutricionistas';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Nutricionista[]> {
    return this.http.get<Nutricionista[]>(this.apiUrl);
  }

  public getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  public save(nutricionista: Nutricionista): Observable<Nutricionista> {
    if (nutricionista.id) {
      return this.http.put<Nutricionista>(`${this.apiUrl}/${nutricionista.id}`, nutricionista);
    } else {
      return this.http.post<Nutricionista>(this.apiUrl, nutricionista);
    }
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
