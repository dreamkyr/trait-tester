export interface IAnswer {
  id: string;
  label: string;
  score: number;
  order: number;
}

export interface IQuestion {
  id: string;
  title: string;
  order: number;
  answers?: IAnswer[];
}
