import RenderAuthorize from './render';
import { getAuthority,setAuthority } from './authority';

let Authorized = RenderAuthorize(getAuthority());

const reloadAuthorized = (): void => {
  Authorized = RenderAuthorize(getAuthority());
};

export { getAuthority,setAuthority,reloadAuthorized };
export default Authorized;
