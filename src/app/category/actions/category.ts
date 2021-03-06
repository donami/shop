import { Action } from '@ngrx/store';
import { Category } from '../../model/interface';

export const SEARCH = '[Category] Search';
export const SEARCH_COMPLETE = '[Category] Search Complete';
export const LOAD = '[Category] Load';
export const SELECT = '[Category] Select';

export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Category[]) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Category) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | SearchAction
  | SearchCompleteAction
  | LoadAction
  | SelectAction;
