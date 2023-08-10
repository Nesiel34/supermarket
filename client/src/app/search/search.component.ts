import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  search!: FormControl;
  sub!: Subscription;
  @Input() searchTxt!:string;
  @Output() searchValueChangeOutput = new EventEmitter<string>();
  constructor( ) {}

  ngOnInit(): void {
    this.search = new FormControl();
    this.sub = this.search.valueChanges.subscribe((s) => {
      this.searchValueChangeOutput.emit(s);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
