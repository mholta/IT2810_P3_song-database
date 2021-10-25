import { SortOrder, SortType } from '../components/SearchFilter/Search.Sort';
import { QueryParam, useQueryParams } from './useQueryParams';

export interface FilterOptions {
  searchString: string | null;
  themes: string[];
  contributor: string | null;
}

export const useFilterParams = (): FilterOptions => {
  const params = useQueryParams();

  const searchString: string | null = params.get(QueryParam.QUERY);
  const themes: string[] = params.getAll(QueryParam.THEME);
  const contributor: string | null = params.get(QueryParam.CONTRIBUTOR);

  const filterOptionsObject: FilterOptions = {
    searchString,
    themes,
    contributor,
  };

  return filterOptionsObject;
};
export interface SortOptions {
  sortType: string;
  sortOrder: string;
}

export const useSortParams = (): SortOptions => {
  const params = useQueryParams();

  const sortType: string = params.get(QueryParam.SORT) ?? SortType.RELEASE_DATE;
  const sortOrder: string = params.get(QueryParam.ORDER) ?? SortOrder.DESC;

  const sortOptionsObject: SortOptions = {
    sortOrder,
    sortType,
  };

  return sortOptionsObject;
};
