import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Note } from '../note'
import { NoteComponent } from "../note/note.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes',
  imports: [NoteComponent, FormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  loaded: boolean = false;
  notes: Note[] = [];
  editing: Note | null = null;

  constructor(private ls: StorageService) {
    this.loadNotes();
  }

  loadNotes() {
    if(!this.loaded) {
      this.notes = this.ls.getNotes();
      this.loaded = true;
      console.log("Notes chargées!");
      console.log(this.notes);
    }
  }

  dialogAddNote() {
    const noteName = window.prompt("Entrez le titre de la note");
    if (noteName) {
      const newNote: Note = new Note(this.notes.length + 1, noteName, "");
      this.ls.addNote(newNote);
      this.notes = this.ls.getNotes();
      console.log("Note ajoutée!");
    }
    return false;
  }

  deleteNote(n: Note) {
    const confirm = window.confirm("Voulez vous vraiment la supprimer ?");
    if (confirm) {
      this.ls.delNote(n.id)
      this.notes = this.ls.getNotes();
      console.log("Note supprimée!");
    }
    return false;
  }

  startEditing(i:number=0,t:string="", c:string="") {
    this.editing = new Note(i,t,c);
    return false;
  }

  cancelEditing() {
    this.editing = null;
    return false;
  }

  saveNote() {
    if (this.editing) {
      if (this.editing.id === 0) {
        this.editing.id = this.notes.length + 1;
        this.ls.addNote(this.editing);
        console.log("Note ajoutée!");
      } else {
        // Mettre à jour la note existante
        this.ls.updateNote(this.editing);
      }
      this.notes = this.ls.getNotes(); 
      this.editing = null; // Réinitialiser l'édition

    }
  }
}
