import { ShortUrl } from "@/types";
import getCollection, { URLS_COLLECTION } from "@/db";

export default async function getByAlias(alias: string,): Promise<ShortUrl | null> {
    const urlCollection = await getCollection(URLS_COLLECTION);
    const data = await urlCollection.findOne({ alias: alias });

    if (data === null) {
        return null;
    }

    const url = { id: data.id,
        alias: data.alias,
        originalUrl: data.originalUrl,
        shortenedUrl: data.shortenedUrl };

    return url;
}