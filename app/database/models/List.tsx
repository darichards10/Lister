import { ListItem } from "./ListItem";


export interface List {
  id: number;
  owner_sub: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  items: ListItem[]; 
}
