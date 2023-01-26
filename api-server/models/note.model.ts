export interface Note {
    id?: number,
    title: string,
    body: string,
  }
  
  export class Note implements Note {
    public id?:number;
    public title: string;
    public body:string;
  }

  