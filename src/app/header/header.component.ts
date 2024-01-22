import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./_header.scss']
})
export class HeaderComponent implements OnInit {
  modeDark?: boolean 
  modolight?: boolean
  
  ngOnInit(): void {
    this.modeDark = false
    this.modolight = true
  }

  FnmodeButton() {
    if (this.modolight) {
      this.modolight = false
      this.modeDark  = true
    } else {
      this.modolight = true
      this.modeDark  = false  
    }
  }
 

}
