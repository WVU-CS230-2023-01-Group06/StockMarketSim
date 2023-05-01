/*
* @author Kiara Neira
* Created: 03/26/23
* Latest Update: 04/29/23
* News API Service to read http url and send out Article Info on Stock Specific News
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(private http:HttpClient) { }
  
  newsURL = "https://newsapi.org/v2/top-headlines?q=stock+market&apiKey=" + environment.NEWS_KEY;

  /*
  * @return JSON formatted Article Info from newsURL
  * Method to Get Article Info and return information provided by given URL
  */
  articleInfo(){
  return this.http.get(this.newsURL);
 }

} 