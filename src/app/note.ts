import { Tag } from './tag'

export class Note {
    private _id: number;
    private _title: string;
    private _content:string;
    private _tags:Tag[];


    constructor(i:number, t:string, c:string) {
        this._id = i;
        this._title = t;
        this._content = c;
        this._tags = [];
    }

    // Guetters et setters
    public get id(): number {
        return this._id;
    }
    
    public set id(value: number) {
        this._id = value;
    }

    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        this._title = value;
    }

    public get content() : string {
        return this._content;
    }
    
    public set content(v : string) {
        this._content = v;
    }

    public get tags() : Tag[] {
        return this._tags;
    }

    public addTag(tt:Tag) {
        this._tags.push(tt);
    }
    
    public delTag(idN:number) {
        for (let i = 0; i < this._tags.length; i++) {
            if (this._tags[i].id === idN) {
                this._tags.splice(i, 1);
                break; 
            }
        }
    }
    
}