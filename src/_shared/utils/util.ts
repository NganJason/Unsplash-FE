export function toCapitalise(word: string): string {
    return word[0].toUpperCase() + word.substring(1);
}

export function toImgDownloadLink(url: string): string {
    const urlArr = url.split("/upload/");

    if (urlArr.length !== 2) {
        return ""
    }

    return urlArr[0] + "/upload/fl_attachment/" + urlArr[1]
}