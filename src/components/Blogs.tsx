"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Calendar, Clock } from 'lucide-react';

interface Article {
  title: string;
  pubDate: string;
  link: string;
  thumbnail: string;
  categories: string[];
}

export default function Blogs({ username }: { username: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // This function finds the image URL hidden inside the Medium text
  const extractImage = (content: string) => {
    const imgReg = /<img[^>]+src="([^">]+)"/;
    const match = imgReg.exec(content);
    return match ? match[1] : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80"; 
  };

useEffect(() => {
    fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          // Process the items to find the real images
          const processedArticles = data.items.map((item: any) => ({
            ...item,
            thumbnail: item.thumbnail || extractImage(item.description || item.content)
          }));
          setArticles(processedArticles.slice(0, 3));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (!loading && articles.length === 0) return null;

  return (
    <section id="writing" className="max-w-6xl mx-auto px-6 py-20">
      <h2 className="text-2xl font-semibold mb-12 flex items-center gap-4">
        Latest Writing <div className="h-px flex-1 bg-slate-800" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          // Skeleton Loader
          [1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-slate-900/50 rounded-2xl animate-pulse border border-slate-800" />
          ))
        ) : (
          articles.map((post, idx) => (
            <motion.a
              key={idx}
              href={post.link}
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all shadow-xl"
            >
              {/* Image Preview */}
              <div className="relative h-44 w-full overflow-hidden">
                <img 
                  src={post.thumbnail || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80"} 
                  alt={post.title} 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-blue-600 text-[10px] font-bold uppercase rounded text-white shadow-lg">
                  Medium
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-slate-500 text-[10px] mb-3">
                  <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(post.pubDate).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Clock size={12}/> 5 min read</span>
                </div>
                
                <h3 className="text-white font-bold text-md leading-snug group-hover:text-blue-400 transition-colors line-clamp-2 mb-4">
                  {post.title}
                </h3>

                <div className="mt-auto flex items-center justify-between">
                   <div className="flex gap-1">
                    {post.categories.slice(0, 2).map(cat => (
                      <span key={cat} className="text-[9px] text-slate-500 lowercase">#{cat}</span>
                    ))}
                   </div>
                   <ExternalLink size={14} className="text-slate-600 group-hover:text-white" />
                </div>
              </div>
            </motion.a>
          ))
        )}
      </div>

      <div className="mt-12 text-center">
        <a 
          href={`https://medium.com/@${username}`} 
          target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-800 text-sm text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
        >
          <BookOpen size={16} /> Read all articles on Medium
        </a>
      </div>
    </section>
  );
}