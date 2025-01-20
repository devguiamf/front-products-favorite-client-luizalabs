export interface Login {
    email: string;
    password: string
}

export interface LoginApiResponse {
    token: string;
    user: {
        name: string;
        email: string
    }
}

export interface Register {
    name: string;
    email: string;
    password: string;
}