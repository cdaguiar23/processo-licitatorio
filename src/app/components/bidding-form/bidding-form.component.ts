import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BiddingService } from '../../services/bidding.service';

@Component({
  selector: 'app-bidding-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">{{ isEditing ? 'Editar' : 'Nova' }} Licitação</h2>
      
      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="max-w-lg">
        <div class="mb-4">
          <label class="block mb-2">Número</label>
          <input type="text" formControlName="number" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block mb-2">Ano</label>
          <input type="number" formControlName="year" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block mb-2">Título</label>
          <input type="text" formControlName="title" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block mb-2">Descrição</label>
          <textarea formControlName="description" class="w-full p-2 border rounded" rows="4"></textarea>
        </div>

        <div class="mb-4">
          <label class="block mb-2">Data de Abertura</label>
          <input type="datetime-local" formControlName="openingDate" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block mb-2">Data de Encerramento</label>
          <input type="datetime-local" formControlName="closingDate" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block mb-2">Valor Estimado</label>
          <input type="number" formControlName="estimatedValue" class="w-full p-2 border rounded">
        </div>

        <div class="mb-4">
          <label class="block mb-2">Tipo</label>
          <select formControlName="type" class="w-full p-2 border rounded">
            <option value="pregao">Pregão</option>
            <option value="tomada_preco">Tomada de Preço</option>
            <option value="concorrencia">Concorrência</option>
            <option value="convite">Convite</option>
          </select>
        </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded" [disabled]="form.invalid">
          Salvar
        </button>
      </form>
    </div>
  `
})
export class BiddingFormComponent implements OnInit {
  form: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private biddingService: BiddingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      number: ['', Validators.required],
      year: [new Date().getFullYear(), Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      openingDate: ['', Validators.required],
      closingDate: ['', Validators.required],
      estimatedValue: [0, Validators.required],
      type: ['pregao', Validators.required],
      status: ['draft'],
      documents: [[]]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.biddingService.getBiddingById(+id).subscribe(bidding => {
        if (bidding) {
          this.form.patchValue(bidding);
        }
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const bidding = this.form.value;
      
      if (this.isEditing) {
        const id = this.route.snapshot.params['id'];
        this.biddingService.updateBidding(id, bidding).subscribe(() => {
          this.router.navigate(['/licitacoes']);
        });
      } else {
        this.biddingService.createBidding(bidding).subscribe(() => {
          this.router.navigate(['/licitacoes']);
        });
      }
    }
  }
}