import { Component, OnInit } from '@angular/core';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'cocina-app';
  mostrar :boolean = false;
  constructor(private storageService:StorageService){
  }
  ngOnInit(): void {
    if(this.storageService.existsUser()){
      this.mostrar=true;
    }else{
      this.mostrar=false;
    }
  }

}
