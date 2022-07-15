export interface Authentication {
  login: string
  password: string
}

export interface User {
  id: number;
  token: string,
  name: {
    first: string,
    last: string
  }
  login: string;
  password: string;

}

export interface AuthResponse {
  token: string
}
