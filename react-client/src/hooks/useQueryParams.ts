import { useLocation, useHistory } from 'react-router-dom';
import { RouteFolders } from '../pages/MainRouter';

/**
 * Custom hook for getting query parameters in URL.
 */
export const useQueryParams = () => {
  const query = new URLSearchParams(useLocation().search);

  const history = useHistory();

  const pushState = () => {
    history.replace(RouteFolders.SEARCH + '?' + query.toString());
  };

  const set = (name: string, value: string, acceptMultiple?: boolean) => {
    if (acceptMultiple) {
      if (!query.getAll(name).includes(value)) query.append(name, value);
    } else {
      query.set(name, value);
    }

    pushState();
  };

  const deleteParamWithValue = (name: string, value: string) => {
    const paramValues = query.getAll(name).filter((v) => v !== value);
    query.delete(name);
    paramValues.forEach((value) => set(name, value, true));

    pushState();
  };

  const hasValue = (name: string, value: string) =>
    query.getAll(name).includes(value);

  const getAll = (name: string) => query.getAll(name);

  const reset = () => history.replace(RouteFolders.SEARCH);

  const has = (name: string) => query.has(name);
  const get = (name: string) => query.get(name);
  const deleteParam = (name: string) => {
    query.delete(name);
    pushState();
  };

  return {
    set,
    has,
    hasValue,
    get,
    getAll,
    delete: deleteParam,
    deleteParamWithValue,
    reset,
    query,
  };
};

/**
 * Enum of the different query parameters we use.
 */
export enum QueryParam {
  QUERY = 'query',
  CONTRIBUTOR = 'contributor',
  THEME = 'theme',
  SORT = 'sort',
  ORDER = 'order',
}
