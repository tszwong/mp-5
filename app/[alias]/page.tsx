import getByAlias from "@/lib/get-url";

export default async function AliasUrlPage({ params }: { params: Promise<{ alias: string }>; }) {
    const { alias } = await params;
    const url_object = await getByAlias(alias);

    if (url_object === null) {
        return (
            <p>Invalid URL</p>
        );
    }
    else {
        return (
            <meta http-equiv="refresh" content={`0;url=${url_object.originalUrl}`} />
        );
    }
}