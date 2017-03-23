
export class cell {
  backcolor: string;
  forecolor: string;
  text: string;
  id: number;
  isHighlighted: boolean;
  isBlinkingColor: boolean;
}

export class row {
    id: number;
    data: cell[];
}