import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-404',
    templateUrl: './404.component.html',
    styleUrls: ['./404.component.css']
})

export class PageNotFoundComponenet implements OnInit{
    key: any

    constructor(private router: Router){}

    ngOnInit(): void {
        this.key = localStorage.getItem('currentUser')
        console.log(this.key);
    }
    // goToHome(){
    //     this.router.navigate(['/admin/dashboard']);
    // }

}