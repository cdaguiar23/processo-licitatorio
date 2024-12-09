import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Bidding } from '../models/bidding.model';

@Injectable({
  providedIn: 'root'
})
export class BiddingService {
  private biddings: Bidding[] = [];

  constructor() {}

  getBiddings(): Observable<Bidding[]> {
    return of(this.biddings);
  }

  getBiddingById(id: number): Observable<Bidding | undefined> {
    return of(this.biddings.find(bid => bid.id === id));
  }

  createBidding(bidding: Omit<Bidding, 'id'>): Observable<Bidding> {
    const newBidding = {
      ...bidding,
      id: this.generateId()
    };
    this.biddings.push(newBidding);
    return of(newBidding);
  }

  updateBidding(id: number, bidding: Partial<Bidding>): Observable<Bidding | undefined> {
    const index = this.biddings.findIndex(bid => bid.id === id);
    if (index !== -1) {
      this.biddings[index] = { ...this.biddings[index], ...bidding };
      return of(this.biddings[index]);
    }
    return of(undefined);
  }

  deleteBidding(id: number): Observable<boolean> {
    const index = this.biddings.findIndex(bid => bid.id === id);
    if (index !== -1) {
      this.biddings.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  private generateId(): number {
    return Math.max(0, ...this.biddings.map(b => b.id)) + 1;
  }
}