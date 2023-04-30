import { Component } from '@angular/core';
import { BreadcrumbDefinition, BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {
  breadcrumbDefinitions: BreadcrumbDefinition[] = [];

  constructor(public bcService: BreadcrumbService) {
    this.bcService.breadcrumbs$.subscribe({
      next: bcDefs => {
        this.breadcrumbDefinitions = bcDefs;
      }
    })
  }

  showBreadcrumbs(breadcrumbs: BreadcrumbDefinition[]): boolean {
    let show = false;
    breadcrumbs.forEach(x => {
      if (x.label !== 'Inicio')
        show = true;
    })

    return show;
  }
}
