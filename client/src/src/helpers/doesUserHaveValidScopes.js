import { useSelector } from 'react-redux';
import { difference as _difference } from 'lodash';

export default function (accessRoles) {
  const { scopes } = useSelector(state => state.userInfo);
  return _difference(accessRoles, scopes).length === 0;
}
