import {
  Component,
  Inject,
  forwardRef, Optional
} from "@angular/core";
import {NgAisIndex, NgAisInstantSearch, TypedBaseWidget} from "angular-instantsearch";
import {connectAutocomplete} from "instantsearch.js/es/connectors";
import {
  AutocompleteWidgetDescription,
  AutocompleteConnectorParams
} from "instantsearch.js/es/connectors/autocomplete/connectAutocomplete";
import {Router} from "@angular/router";

@Component({
  selector: "app-autocomplete",
  template: `
    <div>
      <p-autoComplete
        (completeMethod)="state.refine(text)"
        (onSelect)="selectOption($event.name)"
        (keydown.enter)="selectOption(text['name'])"
        [suggestions]="state.indices.length ? state.indices[0].hits : []"
        [(ngModel)]="text"
        type="search"
        placeholder="Search"
        field="name">
      </p-autoComplete>
    </div>
  `
})
export class AutocompleteComponent extends TypedBaseWidget<AutocompleteWidgetDescription, AutocompleteConnectorParams> {
  override state: AutocompleteWidgetDescription['renderState'] = {
    currentRefinement: "",
    refine: () => null,
    indices: []
  };
  text: string;

  constructor(
    @Inject(forwardRef(() => NgAisIndex))
    @Optional()
    public parentIndex: NgAisIndex,
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchInstance: NgAisInstantSearch,
    private router: Router
  ) {
    super('SearchBox');
    this.createWidget(connectAutocomplete as any, {});

  }

  public override ngOnInit() {
    super.ngOnInit();
    this.state.refine(this.text);
  }

  selectOption(search: any) {
    if (this.router.url !== '/') this.router.navigate(['/'])
    this.state.refine(search)
  }
}
