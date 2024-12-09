import { Routes } from '@angular/router';
import { BiddingListComponent } from './components/bidding-list/bidding-list.component';
import { BiddingFormComponent } from './components/bidding-form/bidding-form.component';
import { BiddingDetailComponent } from './components/bidding-detail/bidding-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'licitacoes', pathMatch: 'full' },
  { path: 'licitacoes', component: BiddingListComponent },
  { path: 'licitacoes/nova', component: BiddingFormComponent },
  { path: 'licitacoes/:id', component: BiddingDetailComponent },
  { path: 'licitacoes/:id/editar', component: BiddingFormComponent }
];