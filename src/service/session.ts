import axios from 'axios';
import qs from 'qs';
import dotenv from "dotenv";
import {GitHubOauthToken, GitHubUser, GoogleOauthToken, GoogleUserResult} from "../types";

dotenv.config()

export const getGoogleOauthToken = async ({code}: { code: string }): Promise<GoogleOauthToken> => {
    const rootURl = 'https://oauth2.googleapis.com/token';
    const options = {
        code,
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
        grant_type: 'authorization_code',
    };
    try {
        const {data} = await axios.post<GoogleOauthToken>(
            rootURl,
            qs.stringify(options),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        return data;
    } catch (err: any) {
        console.log('Failed to fetch Google Oauth Tokens');
        throw new Error(err);
    }
};


export async function getGoogleUser({id_token, access_token,}: {
    id_token: string; access_token: string;
}): Promise<GoogleUserResult> {
    try {
        const {data} = await axios.get<GoogleUserResult>(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${id_token}`,
                },
            }
        );

        return data;
    } catch (err: any) {
        console.log(err);
        throw Error(err);
    }
}



export const getGithubOathToken = async ({code,}: {
    code: string;
}): Promise<GitHubOauthToken> => {
    const rootUrl = 'https://github.com/login/oauth/access_token';
    const options = {
        client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        code,
    };
    const queryString = qs.stringify(options);
    try {
        const {data} = await axios.post(`${rootUrl}?${queryString}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const decoded = qs.parse(data) as GitHubOauthToken;
        return decoded;
    } catch (err: any) {
        throw Error(err);
    }
};

export const getGithubUser = async ({access_token,}: {
    access_token: string;
}): Promise<GitHubUser> => {
    try {
        const {data} = await axios.get<GitHubUser>(
            'https://api.github.com/user',
            {headers: {Authorization: `Bearer ${access_token}`,},});
        return data;
    } catch (err: any) {
        throw Error(err);
    }
};