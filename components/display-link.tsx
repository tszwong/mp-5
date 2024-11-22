import { ShortUrl } from "@/types";

export default function DisplayLink({ url }: { url: ShortUrl }) {
  return (
    <div className="">
      <a href={url.shortenedUrl}>{url.alias}</a>
      <p>{url.originalUrl}</p>
    </div>
  );
}