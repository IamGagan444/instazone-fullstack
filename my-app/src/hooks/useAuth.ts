import { useState, useEffect } from 'react';
import { parseCookies } from '../lib/cookieUtils';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const cookies = parseCookies();
    const accessToken = cookies.accessToken;
    setIsLoggedIn(!!accessToken);
  }, []);

  return { isLoggedIn };
}

