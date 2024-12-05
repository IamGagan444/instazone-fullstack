export interface User {
  username: string;
  profileImage: string;
  githubProfile?: object;
}
export interface AppProps {
  users: User[];
}
export interface Sessions {
  name?: string;
  email?: string;
  image?: string;
  githubProfile?: object;
}
