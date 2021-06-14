import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { timeout } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private server = 'http://localhost:51730/';
  private host = this.server + 'api/';


  constructor(public httpClient: HttpClient) { }


  public get(url: string) {
    return this.httpClient.get(this.host + url, {
      responseType: 'json'
    }).pipe(timeout(120000));
  }

  public post(url: string, body: any) {
    return this.httpClient.post(this.host + url, body, {
      responseType: 'json'
    }).pipe(timeout(120000));
  }

}
