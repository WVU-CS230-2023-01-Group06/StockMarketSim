/*
* @author Kiara Neira
* Latest Update: 04/18/23
* Landing/HomePage Layout .ts file for features of Home Page
*/
import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.css']

})
export class LandingLayoutComponent implements OnInit{
  
  constructor(private newsapi:NewsApiService){}

  news = {articles:[] as any};

  ngOnInit() {

      /*
      * Article Info Call using NewsApiService to parse and use for ngFor loop Calls
      */
      this.newsapi.articleInfo().subscribe((response) => {
        console.log(response);
        this.news = JSON.parse(JSON.stringify(response));
    });

    }
}


