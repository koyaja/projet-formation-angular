import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { CounterComponent } from "./counter/counter.component";
import {AgentComponent} from './agent/agent.component';
import {map, Observable, shareReplay} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {AgentService} from './agent.service';
import {AuthService, User} from './service/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatSidenav, MatSidenavContainer, MatToolbar, MatNavList, MatListItem, MatIcon, MatMenu, AsyncPipe, MatMenuTrigger, MatIconButton, MatMenuItem, RouterLinkActive, NgIf, MatSidenav,MatSidenavContent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projet-formation';

  isHandset$: Observable<boolean> ;
  currentUser: User | null;

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService, private router: Router) {
    this.isHandset$= this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map((result: { matches: any; }) => result.matches),
        shareReplay()
      );
    this.currentUser = this.authService.getCurrentUser();
    console.log('current user ',this.currentUser)
  }


  laValeur(event: any){
    console.log(event)
  }

}
