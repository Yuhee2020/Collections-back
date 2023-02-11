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
    collectionsCount:number;
    likes: number;
    _id?:string
}

export type CollectionType = {
    userId:string
    theme:string
    title: string;
    description: string;
    image?: string;
    itemsCount:number
    creationDate:Date
    itemsFields: string[];
    _id?:string
}

