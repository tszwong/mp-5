"use server";

import { ShortUrl } from '@/types';
import getCollection, { URLS_COLLECTION } from '@/db';

export default async function createShortenedUrl(alias: string, originalUrl: string, shortenedUrl: string): 
Promise<ShortUrl | null> {
    const urls = await getCollection(URLS_COLLECTION);
    const shortUrl = { alias: alias, originalUrl: originalUrl, shortenedUrl: shortenedUrl };

    const existingAlias = await urls.findOne({ alias });
    if (existingAlias) {
        throw new Error("Alias already exists");
    }

    const res = await urls.insertOne(shortUrl);

    if (!res.acknowledged) {
        return null;
    }

    return {
        ...shortUrl, id: res.insertedId.toHexString()
    };
}