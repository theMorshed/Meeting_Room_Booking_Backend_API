export type TUserRole = 'user' | 'admin';

export type TUser = {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: TUserRole;
};
