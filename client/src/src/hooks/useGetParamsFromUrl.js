import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const useGetParamsFromUrl = () => {
  const location = useLocation();
  return queryString.parse(location.search);
};

export default useGetParamsFromUrl;