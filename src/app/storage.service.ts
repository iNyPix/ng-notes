import { Injectable } from '@angular/core';
import { Tag } from './tag';
import { Note } from './note'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // TAG
  addTag(t: Tag): void {
    let existingTags = JSON.parse(localStorage.getItem("tags") ?? '[]') as Tag[];
    existingTags.push(t);
    localStorage.setItem("tags", JSON.stringify(existingTags));
  }

  getTags(): Tag[] {
    return JSON.parse(localStorage.getItem("tags") ?? '[]') as Tag[];
  }

  delTag(identifiant: number): void {
    let existingTags = JSON.parse(localStorage.getItem("tags") ?? '[]') as Tag[];

    existingTags = existingTags.filter(elt => elt.id !== identifiant);
    localStorage.setItem("tags", JSON.stringify(existingTags));
  }

  updateTag(t: Tag): void {
    let existingTags = JSON.parse(localStorage.getItem("tags") ?? '[]') as Tag[];
    existingTags = existingTags.map(tag => tag.id === t.id ? t : tag);
    localStorage.setItem("tags", JSON.stringify(existingTags));
  }

  // NOTE
  addNote(n: Note): void {
    let existingNotes = this.getNotes();
    existingNotes.push(n);
    localStorage.setItem("notes", JSON.stringify(existingNotes));
  }

  getNotes(): Note[] {
    const existingNotes = JSON.parse(localStorage.getItem("notes") ?? '[]') as any[]
    return existingNotes.map(note => new Note(note._id, note._title, note._content));
  }

  delNote(identifiant: number): void {
    let existingNotes = this.getNotes();
    existingNotes = existingNotes.filter(elt => elt.id !== identifiant);
    localStorage.setItem("notes", JSON.stringify(existingNotes));
  }

  updateNote(n: Note): void {
    let existingNotes = this.getNotes();
    existingNotes = existingNotes.map(note => note.id === n.id ? n : note);
    localStorage.setItem("tags", JSON.stringify(existingNotes));
  }

  clear(): void {
    localStorage.clear();
  }
}
