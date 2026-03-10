import Parser from "rss-parser";

let cachedArticles: any[] = [];
let lastFetched = 0;

export async function GET() {
  const CACHE_DURATION = 15 * 24 * 60 * 60 * 1000; // 15 days in ms
  const now = Date.now();

  // If cache is still valid, return it
  if (cachedArticles.length > 0 && now - lastFetched < CACHE_DURATION) {
    return new Response(JSON.stringify(cachedArticles), {
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const parser = new Parser();
    const feed = await parser.parseURL("https://medium.com/feed/@90zuneth99");

    const articles = feed.items.slice(0, 6).map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      content: item["content:encoded"] || item.content || "",
      categories: item.categories || [],
    }));

    // Update cache
    cachedArticles = articles;
    lastFetched = now;

    return new Response(JSON.stringify(articles), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Medium fetch error:", err);

    // If fetch fails but cache exists, return cached articles
    if (cachedArticles.length > 0) {
      return new Response(JSON.stringify(cachedArticles), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ error: "Failed to fetch Medium feed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}