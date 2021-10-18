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
