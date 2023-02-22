import {Dayjs} from "dayjs";

export type UserType = {
    email: string
    password: string
    userName: string
    avatar: string
    role: string
    isBlocked: boolean
    registrationDate: string
    lastLoginDate: string
    accessToken: string
    refreshToken: string
    collectionsCount:number
    likes: number
    _id?:string
    provider:string
    verified:boolean

}

export type CollectionType = {
    userId:string
    theme:string
    title: string
    description: string
    image?: string
    itemsCount:number
    creationDate:Date
    itemsFields: string[]
    _id?:string
}

export type ItemType={
    collectionId:string
    collectionName:string
    userId:string
    title:string
    likesCount:number
    commentsCount:number
    usersIdWhoLiked:string[]
    tags:string[]
    image:string
    itemCreationDate:Date
    productionDate:Dayjs
    dateOfCreation:Dayjs
    dateOfWriting:Dayjs
    author:  string
    producer:  string
    countryOfOrigin:  string
    price:  number
    weight:  number
    numberOfCopies:  number
    description:  string
    historyOfCreation:  string
    uniqueCharacteristics:string
    isUniqueItem:boolean
    isAvailableForSale:boolean
    isAvailableForExchange:boolean
}

export  type TagType={
    title:string
}

export  type CommentType={
    itemId: string
    text:string
    userId: string
    userName:string
    creationDate:Date
}

export interface GoogleOauthToken {
    access_token: string;
    id_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    scope: string;
}

export interface GoogleUserResult {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

export type GitHubOauthToken = {
    access_token: string;
};

export interface GitHubUser {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: null;
    email: string;
    hireable: boolean;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: Date;
    updated_at: Date;
}