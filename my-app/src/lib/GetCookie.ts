import Cookies from 'js-cookie';

export function getProfileCookie() {
  const profile = Cookies.get('profile'); // Get the profile cookie
  console.log("Profile cookie:", profile);
  if (profile) {
    try {
      return JSON.parse(profile); // Parse JSON data if it exists
    } catch (error) {
      console.error("Error parsing profile cookie:", error);
      return null;
    }
  }
  return null;
}
