import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviornment } from 'src/enviornments/enviorment';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(private http:HttpClient) { }
  
  newsURL = "https://newsapi.org/v2/top-headlines?q=stock&apiKey=" + enviornment.NEWS_KEY;

  articleInfo(){
  return this.http.get(this.newsURL);
 }

} 