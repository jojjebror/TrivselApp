import { ACTION_KEY } from './loading.constant';

export class State {
  data: string[];
  constructor() {
    this.data = [];
  }
}

export interface LoadingAction {
  [ACTION_KEY]: {
    add?: string;
    remove?: string;
  };
}
