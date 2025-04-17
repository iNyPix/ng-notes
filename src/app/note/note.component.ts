import { Component, input } from '@angular/core';
import { Tag } from '../tag';

@Component({
  selector: 'app-note',
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  id = input<Number>(0);
  title = input<string>("note name");
  content = input<string>("note content");
  tags = input<Tag[]>([]);
}
