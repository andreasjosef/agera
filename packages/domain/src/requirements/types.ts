export interface Requirement {
  id: string;
  name: string;
  steps: Step[];
  due: Date;
}

export interface Step {
  id: string;
  pScore: number;
}
