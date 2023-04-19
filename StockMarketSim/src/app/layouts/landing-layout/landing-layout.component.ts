import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';

@Component({
  selector: 'app-landing-layout',
  templateUrl: './landing-layout.component.html',
  styleUrls: ['./landing-layout.component.css'],
  providers:[NewsApiService]

})
export class LandingLayoutComponent implements OnInit{
  
  constructor(private newsapi:NewsApiService){}

  news = {articles:[] as any};

  ngOnInit() {

      //Logging of the Article Info from JSON file
      this.newsapi.articleInfo().subscribe((response) => {
        console.log(response);
        this.news = JSON.parse(JSON.stringify(response));
    });

    }
}


