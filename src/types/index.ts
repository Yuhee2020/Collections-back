export type UserType = {
    email: string;
    password: string;
    userName: string;
    avatar: string;
    role: string;
    isBlocked: boolean;
    registrationDate: string;
    lastLoginDate: string
    accessToken: string;
    refreshToken: string;
    reviewsCount:number;
    likes: number;
    _id?:string
}

