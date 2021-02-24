import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  setTicket(ticketData) {
    return this.http.post(`${environment.apiBaseUrl}/ticket`, ticketData);
  }
}
