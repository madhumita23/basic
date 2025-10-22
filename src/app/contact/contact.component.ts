import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
    isloggedin = false;

    x() {
      this.isloggedin = ! this.isloggedin;
    }

    courses = ['Angular','React',"Node","express","java"]
}
