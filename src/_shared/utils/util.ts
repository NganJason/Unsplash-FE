import { User } from "../api/client";

export function toCapitalise(word: string): string {
    if (word.length === 0) {
        return word
    }
    
    return word[0].toUpperCase() + word.substring(1);
}

export function toImgDownloadLink(url: string): string {
    const urlArr = url.split("/upload/");

    if (urlArr.length !== 2) {
        return ""
    }

    return urlArr[0] + "/upload/fl_attachment/" + urlArr[1]
}

export function getJWTHeader(user: User | null | undefined): Record<string, string> {
    if (user) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return { Authorization: `Bearer ` };
}