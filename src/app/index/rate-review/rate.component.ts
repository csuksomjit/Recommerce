import { Component, AfterViewInit, ElementRef , animate, style, state, transition, trigger ,OnInit, AfterViewChecked} from '@angular/core';
import {RateService} from './rate.service';
import {CookieService} from 'angular2-cookie/core';
import { default as swal } from 'sweetalert2';


@Component({
  selector: 'rating',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css'],
  animations: [
    trigger("fadeIn", [
      state("open", style({opacity: 1})),
      state("closed, void", style({opacity: 0,display:'none'})),
      transition("closed <=> open", animate(500)),
    ])
  ],

   // animations: [trigger(
   //    'fadeIn',
   //    [
   //      state('closed, void', style({height: '0px', color: 'maroon', borderColor: 'maroon'})),
   //      state('open', style({height: '*', borderColor: 'green', color: 'green'})),
   //      transition(
   //          'closed<=> open', [animate(500, style({height: '250px'})), animate(500)])
   //    ])],
   
})

export class Rate implements OnInit{
  title = 'app works!';
  state = "closed";
  itemRating = [];
  username;
  constructor(private elementRef:ElementRef,
              private rateService:RateService,
              private _cookieService:CookieService,
    ){}
  ngAfterViewInit(){
    // console.log('Afterview');
      
      
      
  }
  ngOnInit(){
    var recieveCookie = this._cookieService.getObject('login');
      if(recieveCookie==undefined){
        
      }else if(JSON.parse(JSON.stringify(recieveCookie)).login){
         this.username = JSON.parse(JSON.stringify(recieveCookie)).data.username;
         var json = {
           'username':this.username,
         };
        console.log(json);
        this.rateService.getItem(json).subscribe(res=>{
          this.itemRating = res;
          console.log(this.itemRating);
          if(this.itemRating.length!=0){
            this.state = "open";
          }
          
          document.querySelector('body').classList.add('ovh');
        });
        
      }
    // console.log('on init');
    // var recieveCookie = this._cookieService.getObject('login');
    //   if(recieveCookie==undefined){
        
    //   }else if(JSON.parse(JSON.stringify(recieveCookie)).login){
    //      var username = JSON.parse(JSON.stringify(recieveCookie)).data.username;
    //      var json = {
    //        'username':username,
    //      };
    //     console.log(json);
    //     this.rateService.getItem(json).subscribe(res=>{
    //       this.itemRating = res;
    //       console.log(this.itemRating);
    //       this.state = "open";
    //     });
        
    //   }
    // this.inpustName = this.itemId + '_rating';
    
  }
  ngAfterViewChecked(){
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "/app/index/rate-review/rate.script.js";
      this.elementRef.nativeElement.appendChild(s);
  }  
  
  rateItem(){
    var state = this.checkHasRate();
    if(state=="open"){
      swal('Please rate all the items','','warning');
    }else{
      var json ={
        'username':this.username,
        'items':this.itemRating
      }
      this.rateService.rateItem(json).subscribe(res=>{
        swal("Thank you", "", "success");
        this.state = state;
      })
      

    }
    document.querySelector('body').classList.remove('ovh');
  }

  onClickRate(id:String,rateName:String,value:number){
    var index = this.findById(this.itemRating,id);
    if(index>=0){
      this.addRate(index,rateName,value);
      console.log(this.itemRating[index]);
    }
    else{
      console.log("somethings wrong!!");
    }

  }

  checkHasRate(){
    for(var i = 0;i<this.itemRating.length;i++){
      if( this.itemRating[i].myrate.overall == 0 ||
          this.itemRating[i].myrate.price == 0 ||
          this.itemRating[i].myrate.quality == 0 ||
          this.itemRating[i].myrate.design == 0 ||
          this.itemRating[i].myrate.sustainability == 0 
        ){
        return "open";
      }

    }

    return "closed";
  }

  findById(array:any[],id:String){
    for (var i = 0 ;i <= array.length; i++) {
      if(array[i]._id == id){
        return i;
      }
    }
    return -1;
  }

  addRate(index:number,rateName:String,value:number){
    switch (rateName) {
      case "overall":
        // code...
          this.itemRating[index].myrate.overall = value;
        break;
      case "price":
        // code...
          this.itemRating[index].myrate.price = value;
        break;
      case "quality":
        // code...
          this.itemRating[index].myrate.quality = value;
        break;
      case "design":
        // code...
          this.itemRating[index].myrate.design = value;
        break;
      case "sustainability":
        // code...
          this.itemRating[index].myrate.sustainability = value;
        break;  
      default:
        // code...
        break;
    }
  }

}
