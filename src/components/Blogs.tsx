"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Calendar, ChevronLeft, ChevronRight, PenTool, Layout, AlertCircle } from 'lucide-react';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
  const [error, setError] = useState(false);

  const extractImage = (content: string) => {
    const imgReg = /<img[^>]+src="([^">]+)"/;
    const match = imgReg.exec(content);
    return match ? match[1] : "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80"; 
  };

  useEffect(() => {
    const fetchArticles = async () => {
      if (!username) return;
      setLoading(true);
      setError(false);
      
      try {
        const cleanUsername = username.startsWith('@') ? username : `@${username}`;
        const rssUrl = `https://medium.com/feed/${cleanUsername}`;
        
        // Removed &t=Date.now() which caused the 500 error and hydration issues
        // Try using a different proxy service if rss2json is being blocked
const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const processedArticles = data.items.map((item: any) => ({
            title: item.title,
            pubDate: item.pubDate,
            link: item.link,
            thumbnail: item.thumbnail || extractImage(item.content || item.description),
            categories: item.categories || ["Engineering"]
          }));
          setArticles(processedArticles.slice(0, 6));
        } else {
          console.warn("Medium feed empty:", data.message);
          setError(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [username]);

  return (
    <section id="writing" className="py-24 bg-[#030712] overflow-hidden min-h-[600px]">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-6 relative mb-24 flex flex-col items-start text-left">
        <span className="absolute -left-6 -top-12 text-[120px] font-black text-white/[0.02] select-none pointer-events-none hidden md:block uppercase">
          Logs
        </span>

        <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">
          <PenTool size={14} className="text-blue-500" /> 
          External_Feeds / Medium_Publications
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 w-full">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Latest <span className="text-slate-700 italic font-light">Writing.</span>
          </h2>
          <div className="hidden md:block flex-1 h-px bg-slate-800 mb-4 opacity-50" />
          <div className="flex items-center gap-4 px-4 py-2 bg-blue-500/5 border border-blue-500/20 rounded-xl backdrop-blur-sm">
            <Layout size={14} className="text-blue-500" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Live Feed</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-full mx-auto">
        {loading ? (
          <div className="flex justify-center gap-6 overflow-hidden px-10">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[320px] md:min-w-[420px] h-[480px] bg-slate-900/40 rounded-[2.5rem] animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : error || articles.length === 0 ? (
          /* Fallback if data is missing or API failed */
          <div className="max-w-4xl mx-auto px-6 py-20 text-center border border-dashed border-slate-800 rounded-[3rem] bg-slate-900/10">
            <AlertCircle className="mx-auto text-slate-700 mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Publications Standby</h3>
            <p className="text-slate-500 text-sm mb-8 uppercase tracking-widest font-mono">Status: External_API_Timeout</p>
            <a 
              href={`https://medium.com/@${username}`} 
              target="_blank" 
              className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold transition-colors"
            >
              Check articles on Medium <ExternalLink size={14} />
            </a>
          </div>
        ) : (
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={articles.length > 3}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2.5, slideShadows: false }}
            navigation={{ nextEl: '.swiper-button-next-blog', prevEl: '.swiper-button-prev-blog' }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="blog-swiper !pb-24 !px-10"
          >
            {articles.map((post, idx) => (
              <SwiperSlide key={idx} className="!w-[300px] md:!w-[420px]">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-[520px] bg-slate-900/20 border border-slate-800/50 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl backdrop-blur-sm"
                >
                  <div className="relative h-60 w-full overflow-hidden">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-5 left-5 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase rounded-full text-white">
                      Medium
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-slate-500 text-[11px] mb-4 font-bold uppercase tracking-tighter">
                      <Calendar size={14} className="text-blue-500"/> 
                      {new Date(post.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    
                    <h3 className="text-white font-bold text-xl md:text-2xl leading-tight group-hover:text-blue-400 transition-colors line-clamp-3 mb-6">
                      {post.title}
                    </h3>

                    <div className="mt-auto flex items-center justify-between border-t border-slate-800/50 pt-6">
                      <div className="flex gap-2">
                        {post.categories.slice(0, 2).map(cat => (
                          <span key={cat} className="text-[9px] px-3 py-1 rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50 uppercase font-bold">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                        <ExternalLink size={16} />
                      </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}

            {/* Navigation Arrows */}
            <div className="swiper-button-prev-blog absolute left-10 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 hover:border-blue-500 transition-all hidden xl:flex">
              <ChevronLeft size={28} />
            </div>
            <div className="swiper-button-next-blog absolute right-10 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 hover:border-blue-500 transition-all hidden xl:flex">
              <ChevronRight size={28} />
            </div>
          </Swiper>
        )}
      </div>

      <div className="mt-10 text-center">
        <a 
          href={`https://medium.com/@${username}`} 
          target="_blank"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95"
        >
          <BookOpen size={16} /> Explore All Publications
        </a>
      </div>

      <style jsx global>{`
        .blog-swiper .swiper-pagination-bullet {
          background: #1e293b;
          opacity: 1;
        }
        .blog-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
          width: 35px;
          border-radius: 10px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .blog-swiper .swiper-slide {
          transition: all 0.5s ease;
        }
        .blog-swiper .swiper-slide:not(.swiper-slide-active) {
          filter: blur(2px) brightness(0.5);
          transform: scale(0.9);
          opacity: 0.5;
        }
      `}</style>
    </section>
  );
}