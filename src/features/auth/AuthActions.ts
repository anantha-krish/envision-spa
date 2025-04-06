export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
export const AUTH_REGISTER_REQUEST = "AUTH_REGISTER_REQUEST";

export const loginRequest = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => ({
  type: AUTH_LOGIN_REQUEST,
  payload: { email, password },
});

export const registerRequest = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => ({
  type: AUTH_REGISTER_REQUEST,
  payload: { name, email, password },
});
