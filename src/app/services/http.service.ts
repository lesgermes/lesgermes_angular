import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  post(url: string, body: any): Promise<any> {
    let headerDict = {}
    headerDict["Content-Type"] = 'text/plain';

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    console.log("Call post " + url);
    return this.http.post(url, body, requestOptions)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  get(url: string, body: any = null): Promise<any> {
    var urlGet = url + this.BuildURLParametersString(body);
    console.log("Call get " + urlGet);
    return this.http.get(urlGet)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private BuildURLParametersString(parameters: any): string {
    if (!parameters || parameters == null || Object.keys(parameters).length === 0)
      return "";

    var string = "?";

    var separator = "";
    Object.keys(parameters).forEach(key => {
      string += separator + decodeURI(key) + "=" + encodeURI(parameters[key]);
      separator = "&";
    });

    return string;
  }

  private extractData(res: Response) {
    return res || {};
  }

  private handleError(res: Response | any) {
    console.error('Entering HttpService handleError');
    console.dir(res);
    return Promise.reject(res);
  }

  public hasAuthToken() {
    return localStorage.getItem('token') !== null;
  }
}
