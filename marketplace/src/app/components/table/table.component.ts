import {Component, Input} from '@angular/core';
import {Table} from "primeng/table";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})
export class TableComponent {

  @Input() items: any[];

  @Input() loading: boolean;

  @Input() viewButton: (item: any) => void;

  @Input() filter: (table: Table, $event: Event) => void;

  @Input() firstButton: () => void;

  @Input() secondButton: () => void;

  @Input() editButton: (item: any) => void;

  @Input() deleteButton: (item: any, $event: Event) => void;

  @Input() filterKeyword: string;
  @Input() cols: { name: string, value: string, text: string }[];
  @Input() buttons: string[];
  @Input() tableTitle: string;
  @Input() firstButtonText: string;
  @Input() secondButtonText: string;
  @Input() globalFilterFields: string[];

  private fallbackUrl: string = 'data:image/svg+xml;base64,PHN2ZyBpZD0iSW1hZ2Vfbm90X2F2YWlsYWJsZSIgZGF0YS1uYW1lPSJJbWFnZSBub3QgYXZhaWxhYmxlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3MjAiIGhlaWdodD0iNDA1IiB2aWV3Qm94PSIwIDAgNzIwIDQwNSI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiNmZmY7fS5jbHMtMntmaWxsOiM2NDc5OGE7fS5jbHMtM3tmaWxsOiNkNmRjZTA7ZmlsbC1ydWxlOmV2ZW5vZGQ7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJHcm91cC0yLUNvcHktMyI+PHJlY3QgaWQ9IlJlY3RhbmdsZS1Db3B5LTIiIGNsYXNzPSJjbHMtMSIgd2lkdGg9IjcyMCIgaGVpZ2h0PSI0MDUiLz48L2c+PHBhdGggaWQ9IkltYWdlbm90YXZhaWxhYmxlIiBjbGFzcz0iY2xzLTIiIGQ9Ik0xNzYuMTgsMzEyVjI4MUgxNzJ2MzFabTEwLjcsMFYzMDAuMzZhMTQuMTEsMTQuMTEsMCwwLDEsLjYyLTQuNyw0Ljg0LDQuODQsMCwwLDEsMi0yLjQ4LDUuNjYsNS42NiwwLDAsMSwzLS44NCwzLjU4LDMuNTgsMCwwLDEsMy4wOSwxLjI3LDYuMzEsNi4zMSwwLDAsMSwuOTQsMy44MWgwVjMxMmgzLjg2VjI5OWMwLTIuMzEuNTMtNCwxLjU5LTVhNS40Myw1LjQzLDAsMCwxLDQtMS41Nyw0LjI5LDQuMjksMCwwLDEsMi4zMi42MSwzLjIzLDMuMjMsMCwwLDEsMS4zNiwxLjYyQTEwLjQ0LDEwLjQ0LDAsMCwxLDIxMCwyOThoMFYzMTJoMy44NFYyOTYuNTlxMC0zLjg1LTEuODItNS43YTcsNywwLDAsMC01LjIxLTEuODUsOC4yLDguMiwwLDAsMC03LDMuOTMsNS41LDUuNSwwLDAsMC0yLjI4LTIuODksNy40Niw3LjQ2LDAsMCwwLTQuMTUtMSw4LjA1LDguMDUsMCwwLDAtNi45MSwzLjY2aDB2LTMuMTVIMTgzVjMxMlptMzkuMjEuNTFhMTIuMDgsMTIuMDgsMCwwLDAsNC4yNS0uNzQsMTQuMDgsMTQuMDgsMCwwLDAsNC4xMy0yLjU0LDguMTIsOC4xMiwwLDAsMCwuNzcsMi43N2g0YTguMTUsOC4xNSwwLDAsMS0xLTIuNyw1MS44NSw1MS44NSwwLDAsMS0uMjUtNi43MXYtNS4wOGEyMS42OCwyMS42OCwwLDAsMC0uMTktMy41MSw2LDYsMCwwLDAtMS4yLTIuNTksNi4xMyw2LjEzLDAsMCwwLTIuNjgtMS43LDEzLjg2LDEzLjg2LDAsMCwwLTQuNzQtLjY4LDE1LjM5LDE1LjM5LDAsMCwwLTUuMTcuNzksNy40LDcuNCwwLDAsMC0zLjQxLDIuMjdBOS4xNSw5LjE1LDAsMCwwLDIxOSwyOTZoMGwzLjc4LjVhNS42OSw1LjY5LDAsMCwxLDEuOTItMy4zMyw2Ljg0LDYuODQsMCwwLDEsNC0uOTQsNi41NSw2LjU1LDAsMCwxLDQuNCwxLjI5LDQuMTYsNC4xNiwwLDAsMSwxLjA5LDMuMjh2MWEzNS4yMywzNS4yMywwLDAsMS02Ljg5LDEuMzIsMjguNTMsMjguNTMsMCwwLDAtMy40My41Nyw5LjM0LDkuMzQsMCwwLDAtMi43NywxLjI0LDYuMjcsNi4yNywwLDAsMC0yLDIuMTksNi4wNiw2LjA2LDAsMCwwLS43NiwzLDUuOSw1LjksMCwwLDAsMiw0LjYyLDguMyw4LjMsMCwwLDAsNS43NSwxLjc4Wm0uOTItM2E1LjA2LDUuMDYsMCwwLDEtMy40Mi0xLDMuMiwzLjIsMCwwLDEtMS4xNy0yLjU0LDMuMzMsMy4zMywwLDAsMSwuNTMtMS44MSwzLjQyLDMuNDIsMCwwLDEsMS41My0xLjIzLDEzLjc2LDEzLjc2LDAsMCwxLDMuMzYtLjc2LDI5LDI5LDAsMCwwLDYuMzEtMS40NGgwdjEuMzlhOS4xOCw5LjE4LDAsMCwxLS42MiwzLjgxLDYuMDUsNi4wNSwwLDAsMS0yLjU1LDIuNjMsOCw4LDAsMCwxLTQsMVptMjUuMzMsMTEuNTlhMTIsMTIsMCwwLDAsNS43OC0xLjI3LDcuODYsNy44NiwwLDAsMCwzLjQzLTMuNDZxMS4wOC0yLjE5LDEuMDgtNy40M2gwVjI4OS41NWgtMy41NnYyLjdhOC4yMiw4LjIyLDAsMCwwLTYuNjUtMy4yMSw5LDksMCwwLDAtOC42OCw1LjY4LDE0LjcxLDE0LjcxLDAsMCwwLTEuMTgsNS45MywxMi43NCwxMi43NCwwLDAsMCwyLjU3LDhBOC42NCw4LjY0LDAsMCwwLDI1Mi40LDMxMmE4LDgsMCwwLDAsNi4zMS0yLjk0LDI0LjI1LDI0LjI1LDAsMCwxLS4yOCw0Ljg5LDUuMjIsNS4yMiwwLDAsMS0yLDMsNyw3LDAsMCwxLTQuMTQsMS4wNiw2LjU0LDYuNTQsMCwwLDEtMy45Mi0xLjA2LDMuNSwzLjUsMCwwLDEtMS4zMS0yLjVoMGwtMy43NS0uNTVhNi4xLDYuMSwwLDAsMCwyLjQyLDUuNDUsMTEsMTEsMCwwLDAsNi42MSwxLjc4Wm0uNDMtMTIuMjdhNS43Miw1LjcyLDAsMCwxLTQuNDctMmMtMS4xOC0xLjM1LTEuNzgtMy41MS0xLjc4LTYuNDVxMC00LjA2LDEuODEtNi4xM2E1LjYxLDUuNjEsMCwwLDEsNC4zNy0yLjA2LDUuNzYsNS43NiwwLDAsMSw0LjQ3LDIuMDlxMS44NiwyLjEsMS44Niw2LjIyLDAsNC4zMi0xLjgsNi4zNGE1LjcyLDUuNzIsMCwwLDEtNC40NiwyWk0yNzgsMzEyLjUyYTEwLjY4LDEwLjY4LDAsMCwwLDYuNTItMS45LDkuNjcsOS42NywwLDAsMCwzLjUtNS4zNmgwbC00LS40OGE3LjM0LDcuMzQsMCwwLDEtMi4zOCwzLjUxLDYsNiwwLDAsMS0zLjYzLDEuMSw2LjM0LDYuMzQsMCwwLDEtNC43Ni0yLDguNTYsOC41NiwwLDAsMS0yLjEyLTUuNjdoMTd2LTFxMC01LjU3LTIuODktOC42M2E5Ljc3LDkuNzcsMCwwLDAtNy40Ni0zLjA3LDEwLjA2LDEwLjA2LDAsMCwwLTcuNjgsMy4xM2MtMiwyLjA5LTMsNS0zLDguOHMxLDYuNDksMi45Myw4LjUxQTEwLjQ1LDEwLjQ1LDAsMCwwLDI3OCwzMTIuNTJabTYuMDctMTMuOUgyNzEuMzhhNi44OSw2Ljg5LDAsMCwxLDItNC42OSw2LjExLDYuMTEsMCwwLDEsNC40Ny0xLjc2LDUuOTMsNS45MywwLDAsMSw0Ljc4LDIuMiw3LjQ5LDcuNDksMCwwLDEsMS40Niw0LjI1Wk0zMDksMzEyVjI5OS43NGMwLTIuODcuNTktNC44MywxLjc5LTUuODZhNi4zMSw2LjMxLDAsMCwxLDQuMjUtMS41NCw1LjIsNS4yLDAsMCwxLDIuNy42OSwzLjU4LDMuNTgsMCwwLDEsMS41OSwxLjg0LDEwLjIzLDEwLjIzLDAsMCwxLC40NSwzLjQ4aDBWMzEyaDMuODZWMjk4LjJhMjIuOSwyMi45LDAsMCwwLS4yMS0zLjcsNy41MSw3LjUxLDAsMCwwLTEuMi0yLjgyLDUuNzksNS43OSwwLDAsMC0yLjU5LTEuOTEsOS40Myw5LjQzLDAsMCwwLTMuNzgtLjczLDguMiw4LjIsMCwwLDAtNy4yNSwzLjdoMHYtMy4xOUgzMDUuMVYzMTJabTI5LjgxLjUxYTExLjI2LDExLjI2LDAsMCwwLDUuNS0xLjM4LDkuMjIsOS4yMiwwLDAsMCwzLjg0LTMuODYsMTQuNjcsMTQuNjcsMCwwLDAsMS4zMi02LjgyYzAtMy41Ny0xLTYuMzYtMy04LjM5YTEwLjMzLDEwLjMzLDAsMCwwLTcuNjgtMywxMC43MywxMC43MywwLDAsMC03LjE3LDIuNDlxLTMuNTEsMy0zLjUxLDkuMjVjMCwzLjc5LDEsNi43LDMsOC43MWExMC4yNSwxMC4yNSwwLDAsMCw3LjY2LDNabTAtMy4xM2E2LjE3LDYuMTcsMCwwLDEtNC44MS0yLjE1Yy0xLjI3LTEuNDMtMS45LTMuNTgtMS45MS02LjQ2cy42My01LDEuOTEtNi40NWE2LjQyLDYuNDIsMCwwLDEsOS41OCwwYzEuMjgsMS40MywxLjkyLDMuNTQsMS45Miw2LjMxLDAsMi45NS0uNjQsNS4xNS0xLjkxLDYuNThhNi4xMiw2LjEyLDAsMCwxLTQuODIsMi4xOFpNMzYwLDMxMi4zMWExNSwxNSwwLDAsMCwyLjkxLS4zMmgwbC0uNTYtMy4yYTExLjkxLDExLjkxLDAsMCwxLTEuNjkuMTQsMi41OSwyLjU5LDAsMCwxLTEuMzEtLjI2LDEuNDksMS40OSwwLDAsMS0uNjYtLjcsNS44OCw1Ljg4LDAsMCwxLS4yLTJoMFYyOTMuNTFoMy44NlYyOTAuN2gtMy44NnYtNy40NWwtMy44MywyLjE3djUuMjhoLTIuODJ2Mi44MWgyLjgydjEyLjI3YTEyLjMxLDEyLjMxLDAsMCwwLC40Nyw0LjI3LDMuNjIsMy42MiwwLDAsMCwxLjYyLDEuNjRBNyw3LDAsMCwwLDM2MCwzMTIuMzFabTI0Ljg1LjIxYTEyLjA4LDEyLjA4LDAsMCwwLDQuMjUtLjc0LDE0LjA4LDE0LjA4LDAsMCwwLDQuMTMtMi41NEE4LjA3LDguMDcsMCwwLDAsMzk0LDMxMmg0YTguMTUsOC4xNSwwLDAsMS0xLTIuNyw1My42OSw1My42OSwwLDAsMS0uMjUtNi43MXYtNS4wOGEyMS42OCwyMS42OCwwLDAsMC0uMTktMy41MSw2LDYsMCwwLDAtMS4yLTIuNTksNi4xMyw2LjEzLDAsMCwwLTIuNjgtMS43QTEzLjU0LDEzLjU0LDAsMCwwLDM4OCwyODlhMTUuMzksMTUuMzksMCwwLDAtNS4xNy43OSw3LjQsNy40LDAsMCwwLTMuNDEsMi4yNyw5LDksMCwwLDAtMS42OSwzLjg2aDBsMy43Ny41YTUuNjksNS42OSwwLDAsMSwxLjkyLTMuMzMsNi44NCw2Ljg0LDAsMCwxLDQtLjk0LDYuNSw2LjUsMCwwLDEsNC40LDEuMjksNC4xNiw0LjE2LDAsMCwxLDEuMDksMy4yOHYxQTM1LjczLDM1LjczLDAsMCwxLDM4NiwyOTlhMjguMzYsMjguMzYsMCwwLDAtMy40NC41Nyw5LjM0LDkuMzQsMCwwLDAtMi43NywxLjI0LDYuMjcsNi4yNywwLDAsMC0yLDIuMTksNi4wNiw2LjA2LDAsMCwwLS43NiwzLDUuOSw1LjksMCwwLDAsMiw0LjYyLDguMyw4LjMsMCwwLDAsNS43OCwxLjg2Wm0uOTItM2E1LjA2LDUuMDYsMCwwLDEtMy40Mi0xLDMuMiwzLjIsMCwwLDEtMS4xNy0yLjU0LDMuMzMsMy4zMywwLDAsMSwuNTMtMS44MSwzLjQyLDMuNDIsMCwwLDEsMS41My0xLjIzLDEzLjc2LDEzLjc2LDAsMCwxLDMuMzYtLjc2LDI5LDI5LDAsMCwwLDYuMzEtMS40NGgwdjEuMzlhOS4xOCw5LjE4LDAsMCwxLS42MiwzLjgxLDYuMDUsNi4wNSwwLDAsMS0yLjU1LDIuNjMsOCw4LDAsMCwxLTQsMVptMjcsMi40Nyw4LjYyLTIyLjQ2aC00bC01LjA2LDEzLjdjLS42MiwxLjY3LTEuMDksMy4wOS0xLjQ0LDQuMjgtLjQ0LTEuNTctLjkzLTMuMDgtMS40Ni00LjUzaDBsLTQuODktMTMuNDVoLTQuMDdMNDA5LjExLDMxMlptMTguNTEuNTFhMTIuMDgsMTIuMDgsMCwwLDAsNC4yNS0uNzQsMTQuMDgsMTQuMDgsMCwwLDAsNC4xMy0yLjU0LDguMTIsOC4xMiwwLDAsMCwuNzcsMi43N2g0YTguMTUsOC4xNSwwLDAsMS0xLTIuNyw1My42OSw1My42OSwwLDAsMS0uMjUtNi43MVYyOTcuNUEyMC40OCwyMC40OCwwLDAsMCw0NDMsMjk0YTYsNiwwLDAsMC0xLjItMi41OSw2LjEzLDYuMTMsMCwwLDAtMi42OC0xLjcsMTMuODYsMTMuODYsMCwwLDAtNC43NC0uNjgsMTUuMzksMTUuMzksMCwwLDAtNS4xNy43OSw3LjQsNy40LDAsMCwwLTMuNDEsMi4yNyw5LDksMCwwLDAtMS42OSwzLjg2aDBsMy43Ny41YTUuNjksNS42OSwwLDAsMSwxLjkyLTMuMzMsNi44NCw2Ljg0LDAsMCwxLDQtLjk0LDYuNSw2LjUsMCwwLDEsNC40LDEuMjksNC4xNiw0LjE2LDAsMCwxLDEuMDksMy4yOHYxYTM1LjczLDM1LjczLDAsMCwxLTYuODgsMS4zMiwyOC4zNiwyOC4zNiwwLDAsMC0zLjQ0LjU3LDkuMzQsOS4zNCwwLDAsMC0yLjc3LDEuMjQsNi4yNyw2LjI3LDAsMCwwLTIsMi4xOSw2LjA2LDYuMDYsMCwwLDAtLjc2LDMsNS45LDUuOSwwLDAsMCwyLDQuNjIsOC4zMiw4LjMyLDAsMCwwLDUuNzksMS44M1ptLjkyLTNhNS4wNiw1LjA2LDAsMCwxLTMuNDItMSwzLjIsMy4yLDAsMCwxLTEuMTctMi41NCwzLjMzLDMuMzMsMCwwLDEsLjUzLTEuODEsMy40MiwzLjQyLDAsMCwxLDEuNTMtMS4yMywxMy43NiwxMy43NiwwLDAsMSwzLjM2LS43NiwyOSwyOSwwLDAsMCw2LjMxLTEuNDRoMHYxLjM5YTkuMTgsOS4xOCwwLDAsMS0uNjIsMy44MSw2LjA1LDYuMDUsMCwwLDEtMi41NSwyLjYzLDgsOCwwLDAsMS00LDFabTIwLjkxLTI0LjE2VjI4MUg0NDkuMnY0LjM4Wm0wLDI2LjYzVjI4OS41NUg0NDkuMlYzMTJabTkuNjUsMFYyODFINDU4Ljl2MzFabTEyLjQ2LjUxYTEyLjEzLDEyLjEzLDAsMCwwLDQuMjYtLjc0LDE0LjUxLDE0LjUxLDAsMCwwLDQuMTMtMi41NCw3LjksNy45LDAsMCwwLC43NywyLjc3aDRhOC40Niw4LjQ2LDAsMCwxLTEtMi43LDUzLjY5LDUzLjY5LDAsMCwxLS4yNC02Ljcxdi01LjA4YTIwLjYxLDIwLjYxLDAsMCwwLS4yLTMuNTEsNS44Miw1LjgyLDAsMCwwLTEuMi0yLjU5LDYuMTMsNi4xMywwLDAsMC0yLjY4LTEuNywxMy4zOSwxMy4zOSwwLDAsMC00Ljc0LS42OCwxNS4zOSwxNS4zOSwwLDAsMC01LjE3Ljc5LDcuNDgsNy40OCwwLDAsMC0zLjQxLDIuMjcsOS4xNyw5LjE3LDAsMCwwLTEuNjksMy44NmgwbDMuNzcuNWE1Ljc3LDUuNzcsMCwwLDEsMS45Mi0zLjMzLDYuOTIsNi45MiwwLDAsMSw0LS45NCw2LjQ3LDYuNDcsMCwwLDEsNC4zOSwxLjI5LDQuMiw0LjIsMCwwLDEsMS4xLDMuMjh2MWEzNSwzNSwwLDAsMS02Ljg4LDEuMzIsMjguNTMsMjguNTMsMCwwLDAtMy40My41Nyw5LjM5LDkuMzksMCwwLDAtMi43OCwxLjI0LDYuMjcsNi4yNywwLDAsMC0yLDIuMTksNi4wNiw2LjA2LDAsMCwwLS43NiwzLDUuOTQsNS45NCwwLDAsMCwyLDQuNjIsOC4zMyw4LjMzLDAsMCwwLDUuNzksMS44NlptLjkyLTNhNS4wNiw1LjA2LDAsMCwxLTMuNDItMSwzLjI5LDMuMjksMCwwLDEsLjg5LTUuNTgsMTQsMTQsMCwwLDEsMy4zNy0uNzYsMjguOTMsMjguOTMsMCwwLDAsNi4zLTEuNDRoMHYxLjM5YTksOSwwLDAsMS0uNjIsMy44MSw2LDYsMCwwLDEtMi41NSwyLjYzLDguMDYsOC4wNiwwLDAsMS00LDFabTI2LjkyLDNhOS4wOCw5LjA4LDAsMCwwLDYuOTUtMy4xNWMxLjkzLTIuMSwyLjktNS4wOCwyLjg5LTguOTNhMTUuMDYsMTUuMDYsMCwwLDAtLjY4LTQuNTcsMTEuNDYsMTEuNDYsMCwwLDAtMS45LTMuNjUsOC4xOSw4LjE5LDAsMCwwLTMuMDktMi4zNSw5LjgyLDkuODIsMCwwLDAtNC0uODMsNy42OSw3LjY5LDAsMCwwLTYuMjQsM2gwVjI4MUg0OTMuMXYzMWgzLjU4di0yLjhhNy4zLDcuMywwLDAsMCw2LjMyLDMuMzJabS0uMzItMy4xM2E1LjU4LDUuNTgsMCwwLDEtNC45NC0yLjk0cS0xLjExLTEuOC0xLjExLTUuODRhOS41OCw5LjU4LDAsMCwxLDEuODQtNi4yNyw1LjU3LDUuNTcsMCwwLDEsNC4zOC0yLjE3LDUuNDMsNS40MywwLDAsMSw0LjI4LDIuMDljMS4xOCwxLjQsMS43NywzLjU2LDEuNzcsNi41cy0uNjIsNS0xLjg1LDYuNDZhNS41Nyw1LjU3LDAsMCwxLTQuNDIsMi4yMVpNNTIxLjMyLDMxMlYyODFoLTMuODZ2MzFabTE1LjU1LjUxYTEwLjY4LDEwLjY4LDAsMCwwLDYuNTItMS45LDkuNjcsOS42NywwLDAsMCwzLjUtNS4zNmgwbC00LS40OGE3LjM0LDcuMzQsMCwwLDEtMi4zOCwzLjUxLDYsNiwwLDAsMS0zLjYzLDEuMSw2LjM4LDYuMzgsMCwwLDEtNC43Ni0yLDguNTYsOC41NiwwLDAsMS0yLjEyLTUuNjdoMTd2LTFxMC01LjU2LTIuOS04LjYzYTkuNzcsOS43NywwLDAsMC03LjQ2LTMuMDcsMTAuMDYsMTAuMDYsMCwwLDAtNy42OCwzLjEzcS0zLDMuMTQtMyw4LjhjMCwzLjY1LDEsNi40OCwyLjkzLDguNTFhMTAuNDcsMTAuNDcsMCwwLDAsOCwzLjA3Wm02LjA3LTEzLjlINTMwLjIyYTYuODksNi44OSwwLDAsMSwyLTQuNjksNi4xNSw2LjE1LDAsMCwxLDQuNDctMS43Niw1LjkzLDUuOTMsMCwwLDEsNC43OCwyLjIsNy40OSw3LjQ5LDAsMCwxLDEuNDYsNC4yNVoiLz48cGF0aCBpZD0iU2hhcGUiIGNsYXNzPSJjbHMtMyIgZD0iTTMyNSwxNDcuNDNBMTUuNDMsMTUuNDMsMCwxLDAsMzA5LjU5LDEzMnYwQTE1LjQzLDE1LjQzLDAsMCwwLDMyNSwxNDcuNDNabTAtMjAuNTdhNS4xNCw1LjE0LDAsMSwxLTUuMTUsNS4xNCw1LjE0LDUuMTQsMCwwLDEsNS4xNS01LjE0Wk00MjIuNzMsOTZIMjk5LjNBMTAuMjksMTAuMjksMCwwLDAsMjg5LDEwNi4yOGgwVjIyOS43MUExMC4yOSwxMC4yOSwwLDAsMCwyOTkuMjksMjQwSDQyMi43M0ExMC4yOCwxMC4yOCwwLDAsMCw0MzMsMjI5LjcxVjEwNi4yOUExMC4yOCwxMC4yOCwwLDAsMCw0MjIuNzMsOTZabTAsMTMzLjcxSDI5OS4zVjIwNEg0MjIuNzNabS0xMDYuMzMtMzYsMTYuNzItMjIuMjhMMzQ2LDE4OC41N2wtMy44NSw1LjE0Wm0zOC41NywwLDI0LjQzLTMyLjU3LDI0LjQzLDMyLjU3Wm02Ny43NiwwaC02bC0zMy4xNy00NC4yMmE1LjM0LDUuMzQsMCwwLDAtNy41Mi0uNzIsNS40NCw1LjQ0LDAsMCwwLS43Mi43MkwzNTIuNCwxODBsLTE1LjE3LTIwLjIzYTUuMzMsNS4zMywwLDAsMC03LjUtLjczLDUsNSwwLDAsMC0uNzMuNzNsLTI1LjQ2LDMzLjk0SDI5OS4zVjEwNi4yOUg0MjIuNzNaIi8+PC9zdmc+'

  imageFail($event: ErrorEvent) {
    const img: HTMLImageElement = $event.target as HTMLImageElement
    img.src = this.fallbackUrl
  }
}
