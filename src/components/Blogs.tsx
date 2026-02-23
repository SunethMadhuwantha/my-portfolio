"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Calendar, Clock, ChevronLeft, ChevronRight, PenTool, Layout } from 'lucide-react';

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
          const processedArticles = data.items.map((item: any) => ({
            ...item,
            thumbnail: item.thumbnail || extractImage(item.description || item.content)
          }));
          setArticles(processedArticles.slice(0, 6)); 
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (!loading && articles.length === 0) return null;

  return (
    <section id="writing" className="py-8 bg-[#030712] overflow-hidden">
      
      {/* --- NEW DYNAMIC HEADER (LEFT ALIGNED) --- */}
      <div className="max-w-6xl mx-auto px-6 relative mb-24 flex flex-col items-start text-left">
        {/* Large Decorative Background Label */}
        <span className="absolute -left-6 -top-12 text-[120px] font-black text-white/[0.02] select-none pointer-events-none hidden md:block uppercase">
          Logs
        </span>

        <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">
          <PenTool size={14} className="text-blue-500" /> 
          External_Feeds / Medium_v.2
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 w-full">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            Latest <span className="text-slate-700 italic font-light">Writing.</span>
          </h2>
          
          <div className="hidden md:block flex-1 h-px bg-slate-800 mb-4 opacity-50" />
          
          <div className="flex items-center gap-4 px-4 py-2 bg-blue-500/5 border border-blue-500/20 rounded-xl backdrop-blur-sm">
            <Layout size={14} className="text-blue-500" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
              Live Feed
            </span>
          </div>
        </div>
      </div>

      {/* --- CAROUSEL CONTENT (STAYS THE SAME) --- */}
      <div className="relative max-w-[1400px] mx-auto px-4">
        {loading ? (
          <div className="flex justify-center gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-80 h-[450px] bg-slate-900/50 rounded-3xl animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            navigation={{
              nextEl: '.swiper-button-next-blog',
              prevEl: '.swiper-button-prev-blog',
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="blog-swiper !pb-20 !px-10"
          >
            {articles.map((post, idx) => (
              <SwiperSlide key={idx} className="!w-[300px] md:!w-[420px]">
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col h-[480px] bg-slate-900/20 border border-slate-800/50 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-2xl backdrop-blur-sm"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img 
                      src={post.thumbnail} 
                      alt={post.title} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-5 left-5 px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase rounded-full text-white">
                      Medium
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-slate-500 text-xs mb-4 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-blue-500"/> 
                        {new Date(post.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    
                    <h3 className="text-white font-bold text-xl md:text-2xl leading-tight group-hover:text-blue-400 transition-colors line-clamp-3 mb-6">
                      {post.title}
                    </h3>

                    <div className="mt-auto flex items-center justify-between border-t border-slate-800/50 pt-6">
                       <div className="flex gap-2">
                        {post.categories.slice(0, 2).map(cat => (
                          <span key={cat} className="text-[10px] px-3 py-1 rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50">
                            {cat}
                          </span>
                        ))}
                       </div>
                       <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ExternalLink size={16} />
                       </div>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}

            <div className="swiper-button-prev-blog absolute left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 hover:border-blue-500 transition-all hidden lg:flex shadow-2xl">
              <ChevronLeft size={28} />
            </div>
            <div className="swiper-button-next-blog absolute right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-slate-900/90 border border-slate-800 flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 hover:border-blue-500 transition-all hidden lg:flex shadow-2xl">
              <ChevronRight size={28} />
            </div>
          </Swiper>
        )}
      </div>

      <div className="mt-10 text-center">
        <a 
          href={`https://medium.com/@${username}`} 
          target="_blank"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-sm hover:scale-105 transition-all shadow-lg active:scale-95"
        >
          <BookOpen size={18} /> Explore All Publications
        </a>
      </div>

      <style jsx global>{`
        .blog-swiper .swiper-pagination-bullet {
          background: #334155;
          opacity: 1;
        }
        .blog-swiper .swiper-pagination-bullet-active {
          background: #3b82f6;
          width: 30px;
          border-radius: 10px;
          transition: all 0.4s ease;
        }
        .blog-swiper .swiper-slide {
          transition: filter 0.3s;
        }
        .blog-swiper .swiper-slide:not(.swiper-slide-active) {
          filter: blur(1px) grayscale(0.2);
          opacity: 0.6;
        }
      `}</style>
    </section>
  );
}