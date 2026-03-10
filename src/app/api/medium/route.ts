import Parser from "rss-parser";

export async function GET() {

  const parser = new Parser();

  const feed = await parser.parseURL(
    "https://medium.com/feed/@90zuneth99"
  );

  const articles = feed.items.slice(0,6).map(item => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,

    // IMPORTANT
    content: item["content:encoded"] || item.content || "",

    categories: item.categories || []
  }));

  return Response.json(articles);
}