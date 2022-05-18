import {Component, Input, OnInit} from '@angular/core';
import {Table} from "primeng/table";

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.scss']
})
export class TableComponentComponent implements OnInit {

  @Input() items: any[];

  @Input() loading: boolean;

  @Input() viewButton: (item: any) => void;

  @Input() filter: (table: Table, $event: Event) => void;

  @Input() filterButton: () => void;

  @Input() editButton: (item: any) => void;

  @Input() deleteButton: (item: any, $event: Event) => void;

  @Input() filterKeyword: String;
  @Input() columns: { name: string, value: string }[];
  @Input() buttons: string[];
  @Input() tableTitle: string;
  @Input() filterButtonText: string;


  constructor() {
  }

  ngOnInit(): void {
    console.log(this.items);
  }

}
