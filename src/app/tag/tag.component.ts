import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  id = input<Number>(0);
  name = input<string>("tag name");
  color = input<string>("white");
}
