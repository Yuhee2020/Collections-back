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

export type ItemType={
    collectionId:string
    userId:string
    title:string
    likesCount:number
    usersIdWhoLiked:string[]
    tags:string[]
    image:string
    itemCreationDate:Date
    productionDate:string,
    dateOfCreation:string,
    dateOfWriting:string,
    author:  string,
    producer:  string,
    countryOfOrigin:  string,
    price:  number,
    weight:  number,
    numberOfCopies:  number,
    description:  string,
    historyOfCreation:  string,
    uniqueCharacteristics:string
    isUniqueItem:boolean,
    isAvailableForSale:boolean,
    isAvailableForExchange:boolean,
}

export  type TagType={
    title:string
}