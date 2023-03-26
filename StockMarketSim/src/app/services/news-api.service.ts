import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,
  HttpErrorResponse,  } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  constructor(private http:HttpClient) { }
  //api_key = 'dd9654776c714e2ea68fd176b568208e';
newsURL = "https://newsapi.org/v2/top-headlines?q=stock&apiKey=dd9654776c714e2ea68fd176b568208e"
  
 articleInfo(){
  return this.http.get(this.newsURL);
 
 }
} 