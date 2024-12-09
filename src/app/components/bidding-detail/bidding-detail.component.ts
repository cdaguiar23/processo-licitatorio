import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BiddingService } from '../../services/bidding.service';
import { Bidding } from '../../models/bidding.model';

@Component({
  selector: 'app-bidding-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4" *ngIf="bidding">
      <h2 class="text-2xl font-bold mb-4">{{ bidding.title }}</h2>
      
      <div class="bg-white shadow rounded-lg p-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="font-semibold">Número:</p>
            <p>{{ bidding.number }}/{{ bidding.year }}</p>
          </div>
          
          <div>
            <p class="font-semibold">Status:</p>
            <p>{{ bidding.status }}</p>
          </div>
          
          <div>
            <p class="font-semibold">Data de Abertura:</p>
            <p>{{ bidding.openingDate | date:'dd/MM/yyyy HH:mm' }}</p>
          </div>
          
          <div>
            <p class="font-semibold">Data de Encerramento:</p>
            <p>{{ bidding.closingDate | date:'dd/MM/yyyy HH:mm' }}</p>
          </div>
          
          <div>
            <p class="font-semibold">Valor Estimado:</p>
            <p>{{ bidding.estimatedValue | currency:'BRL' }}</p>
          </div>
          
          <div>
            <p class="font-semibold">Tipo:</p>
            <p>{{ bidding.type }}</p>
          </div>
        </div>

        <div class="mt-4">
          <p class="font-semibold">Descrição:</p>
          <p class="mt-2">{{ bidding.description }}</p>
        </div>

        <div class="mt-4">
          <p class="font-semibold">Documentos:</p>
          <ul class="list-disc ml-4 mt-2">
            <li *ngFor="let doc of bidding.documents">{{ doc }}</li>
          </ul>
        </div>

        <div class="mt-6 flex gap-2">
          <button class="bg-blue-500 text-white px-4 py-2 rounded" (click)="onEdit()">
            Editar
          </button>
          <button class="bg-red-500 text-white px-4 py-2 rounded" (click)="onDelete()">
            Excluir
          </button>
        </div>
      </div>
    </div>
  `
})
export class BiddingDetailComponent implements OnInit {
  bidding?: Bidding;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private biddingService: BiddingService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.biddingService.getBiddingById(+id).subscribe(
      bidding => this.bidding = bidding
    );
  }

  onEdit() {
    if (this.bidding) {
      this.router.navigate(['/licitacoes', this.bidding.id, 'editar']);
    }
  }

  onDelete() {
    if (this.bidding && confirm('Tem certeza que deseja excluir esta licitação?')) {
      this.biddingService.deleteBidding(this.bidding.id).subscribe(() => {
        this.router.navigate(['/licitacoes']);
      });
    }
  }
}