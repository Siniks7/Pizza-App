export interface  ILogin{
  email: boolean
  password: boolean
}

export interface  IReg{
  email: boolean
  password: boolean
  name: boolean
}

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
}

export type RegForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
	name: {
		value: string;
	};
}