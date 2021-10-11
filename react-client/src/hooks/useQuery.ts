import { useLocation, useHistory } from 'react-router-dom';
import { RouteFolders } from '../pages/MainRouter';

export const useQuery = (): [URLSearchParams, () => void] => {
  const query = new URLSearchParams(useLocation().search);

  const history = useHistory();
  const push = () => history.push(RouteFolders.SEARCH + '?' + query.toString());

  return [query, push];
};

export enum QueryParam {
  THEME = 'theme',
}
