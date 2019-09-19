//使用localStorage存储权限信息
export function getAuthority(str?: string): string | string[] {
  // return localStorage.getItem('dt-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('dt-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  if (!authority) {
    return ['admin'];
  }
  return authority;
}

export function setAuthority(authority: string | string[]): void {
  const dtAuthority = typeof authority === 'string' ? [authority] : authority;
  const defaultAuthority=['admin','user'];
  return localStorage.setItem('dt-authority', JSON.stringify([...defaultAuthority,...dtAuthority]));
}
