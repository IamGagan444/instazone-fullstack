export function parseCookies() {
    return Object.fromEntries(
      document.cookie.split('; ').map(cookie => {
        const [name, ...rest] = cookie.split('=');
        return [name, decodeURIComponent(rest.join('='))];
      })
    );
  }
  
  