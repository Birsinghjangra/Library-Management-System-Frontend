import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-404',
    templateUrl: './404.component.html',
    styleUrls: ['./404.component.css']
})

export class PageNotFoundComponenet implements OnInit{
    constructor(private router: Router){}

    ngOnInit(): void {
        
    }
    goToHome(){
        this.router.navigate(['/admin/dashboard']);
    }

}