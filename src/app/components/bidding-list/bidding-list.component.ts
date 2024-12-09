import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BiddingService } from '../../services/bidding.service';
import { Bidding } from '../../models/bidding.model';

@Component({
  selector: 'app-bidding-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Licitações</h2>
      <button class="bg-blue-500 text-white px-4 py-2 rounded mb-4" [routerLink]="['/licitacoes/nova']">
        Nova Licitação
      </button>

      <div class="grid gap-4">
        <div *ngFor="let bidding of biddings" class="border p-4 rounded">
          <h3 class="text-xl font-semibold">{{ bidding.title }}</h3>
          <p class="text-gray-600">Número: {{ bidding.number }}/{{ bidding.year }}</p>
          <p class="text-gray-600">Abertura: {{ bidding.openingDate | date }}</p>
          <p class="text-gray-600">Status: {{ bidding.status }}</p>
          <div class="mt-2">
            <button class="text-blue-500 mr-2" [routerLink]="['/licitacoes', bidding.id]">
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class BiddingListComponent implements OnInit {
  biddings: Bidding[] = [];

  constructor(private biddingService: BiddingService) {}

  ngOnInit() {
    this.biddingService.getBiddings().subscribe(
      biddings => this.biddings = biddings
    );
  }
}