import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class RateService {

	private rateUrl = '/api/rating';

	constructor(private http:Http,
		){

	}

	getItem(object:Object){

		return this.http.post(this.rateUrl,object).map((res:Response) => res.json());
		
	}


	rateItem(object:Object){
		return this.http.post('/api/rateItem',object).map((res:Response) => res.json());
	}

	recommendItem(object:Object){
		return this.http.post('/recommend',object).map((res:Response) => res.json());
	}

	rateRecommend(object:Object){
		return this.http.post('/api/rateRecommend',object).map((res:Response) => res.json());
	}

}