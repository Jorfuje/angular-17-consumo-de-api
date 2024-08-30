export interface IUsers {
    message: string;
    users:   User[];
}

export interface User {
    id:       number;
    nombre:   string;
    apellido: string;
    edad:     number;
    email:    string;
}
