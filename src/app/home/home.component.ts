import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news: any[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.loading = true;
    this.http.get('https://hacker-news.firebaseio.com/v0/newstories.json')
      .subscribe((response: any) => {
        const newsIds = response.slice(0, this.pageSize * this.currentPage);
        this.loadNewsDetails(newsIds);
      }, error => {
        console.error('Error loading news IDs:', error);
        this.loading = false;
      });
  }

  loadNewsDetails(newsIds: number[]): void {
    const newsDetails: any[] = [];
    const requests = newsIds.map((id: number) => 
      firstValueFrom(this.http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
    );
    Promise.all(requests)
      .then(responses => {
        responses.forEach((response: any) => {
          newsDetails.push({
            title: response.title,
            link: response.url,
            date: new Date(response.time * 1000)
          });
        });
        this.news = newsDetails;
      })
      .catch(error => {
        console.error('Error loading news details:', error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  loadMore(): void {
    this.currentPage++;
    this.loadNews();
  }
}
