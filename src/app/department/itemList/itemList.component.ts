import { Component, AfterViewInit, ElementRef } from '@angular/core';
import {itemListService} from './itemList.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'itemlist',
  templateUrl: './itemlist.component.html',
  styleUrls: ['./itemlist.component.css']
})

export class itemList {
    department:string;
    category:string;
    private sub:any;
    title = 'app works!';
    data = [];
    constructor(
        private elementRef:ElementRef,
        private itemlistService:itemListService, 
        private route:ActivatedRoute
    ){

    }
    ngAfterViewInit(){
        // var s = document.createElement("script");
        // s.type = "text/javascript";
        // s.src = "/app/app.script.js";
        // this.elementRef.nativeElement.appendChild(s);
    }
    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
           this.department = params['department'];
           this.category = params['category'];

       // In a real app: dispatch action to load the details here.
        });
        this.itemlistService.getItemParams(this.department,this.category).subscribe(data => this.data =data);

        
    }


  
}
