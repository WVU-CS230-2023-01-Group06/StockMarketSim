import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { HttpClient,HttpHeaders,
  HttpErrorResponse,  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  api_key = 'dd9654776c714e2ea68fd176b568208e';

  constructor(private http:HttpClient) { }
  initSources(){
     return this.http.get('https://newsapi.org/v2/sources?q=stocks&language=en&apiKey='+this.api_key);
  }
  initArticles(){
   return this.http.get('https://newsapi.org/v2/top-headlines?q=stocks&apiKey='+this.api_key);
  }
  getArticlesByID(source: String){
   return this.http.get('https://newsapi.org/v2/top-headlines?q='+source+'&apiKey='+this.api_key);
  }
  constructor(private http:HttpClient) { }
  //api_key = 'dd9654776c714e2ea68fd176b568208e';
newsURL = "https://newsapi.org/v2/top-headlines?q=stock&apiKey=dd9654776c714e2ea68fd176b568208e"
  
 articleInfo(){
  return this.http.get(this.newsURL);
 
 }
} 