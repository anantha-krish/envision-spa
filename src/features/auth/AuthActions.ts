export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
export const AUTH_REGISTER_REQUEST = "AUTH_REGISTER_REQUEST";
export const REQUEST_ACCESS_TOKEN_REFRESH = "REQUEST_ACCESS_TOKEN_REFRESH";

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
  firstName,
  lastName,
  designation,
  username,
  confirmPassword,
  role,
  managerId,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  designation: string;
  username: string;
  confirmPassword: string;
  role: string;
  managerId: string;
}) => ({
  type: AUTH_REGISTER_REQUEST,
  payload: {
    email,
    password,
    firstName,
    lastName,
    designation,
    username,
    confirmPassword,
    role,
    managerId,
  },
});
