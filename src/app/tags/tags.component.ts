import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Tag } from '../tag';
import { TagComponent } from "../tag/tag.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-tags',
  imports: [TagComponent, FormsModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  loaded: boolean = false;
  tags: Tag[] = [];
  editing: Tag | null = null;

  constructor(private ls: StorageService) {
    this.loadTags();
  }

  loadTags() {
    if (!this.loaded) {
      this.tags = this.ls.getTags();
      this.loaded = true;
      console.log("Tags chargé!");
    }
  }

  dialogAddTag() {
    const tagName = window.prompt("Entrez le nom du tag");
    if (tagName) {
      const newTag: Tag = {
        id: this.tags.length + 1,
        name: tagName,
        color: ""
      };
      this.ls.addTag(newTag);
      this.tags = this.ls.getTags(); // à quoi sert load ?
      console.log("Tag ajouté!");
    }
    return false;
  }

  deleteTag(t: Tag) {
    const confirm = window.confirm("Voulez vous vraiment le supprimer ?");
    if (confirm) {
      this.ls.delTag(t.id)
      this.tags = this.ls.getTags(); // à quoi sert load ?
      console.log("Tag supprimé!");
    }
    return false;
  }

  startEditing(i:number=0,n:string="", c:string="") {
    this.editing = { id: i, name: n, color: c };
    return false;
  }

  cancelEditing() {
    this.editing = null;
    return false;
  }

  saveTag() {
    if (this.editing) {
      if (this.editing.id === 0) {
        this.ls.addTag(this.editing);
      } else {
        this.ls.updateTag(this.editing);
      }
      this.tags = this.ls.getTags();
      this.editing = null; 

    }
  }
}
