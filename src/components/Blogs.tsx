"use client";

import { useEffect, useState } from "react";
import { BookOpen, ExternalLink, Calendar, ChevronLeft, ChevronRight, PenTool, Layout, AlertCircle } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Article {
  title: string;
  pubDate: string;
  link: string;
  thumbnail?: string;
  categories?: string[];
}

export default function Blogs({ username }: { username: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const extractImage = (html: string) => {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = imgRegex.exec(html);
    return match ? match[1] : "https://images.unsplash.com/photo-1499750310107-5fef28a66643";
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch("/api/medium");
        const data = await response.json();

        if (!data || data.length === 0) {
          setError(true);
          return;
        }

        const processed = data.map((item: any) => ({
          title: item.title,
          pubDate: item.pubDate,
          link: item.link,
          thumbnail: item.thumbnail || extractImage(item.content || ""),
          categories: item.categories || ["Article"]
        }));

        setArticles(processed);
      } catch (err) {
        console.error("Medium fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section id="writing" className="py-24 bg-[#030712] overflow-hidden min-h-[600px]">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-6 relative mb-24 flex flex-col items-start">
        <span className="absolute -left-6 -top-12 text-[120px] font-black text-white/[0.02] hidden md:block uppercase">
          Logs
        </span>

        <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-6">
          <PenTool size={14}/> External_Feeds / Medium_Publications
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 w-full">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            Latest <span className="text-slate-700 italic font-light">Writing.</span>
          </h2>
          <div className="hidden md:block flex-1 h-px bg-slate-800 mb-4 opacity-50"/>
          <div className="flex items-center gap-4 px-4 py-2 bg-blue-500/5 border border-blue-500/20 rounded-xl">
            <Layout size={14}/>
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
              Live Feed
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative max-w-full mx-auto">

        {loading ? (
          <div className="flex justify-center gap-6 px-10">
            {[1,2,3].map(i => (
              <div key={i} className="min-w-[320px] md:min-w-[420px] h-[480px] bg-slate-900/40 rounded-[2.5rem] animate-pulse border border-slate-800"/>
            ))}
          </div>
        ) : error || articles.length === 0 ? (
          <div className="max-w-4xl mx-auto px-6 py-20 text-center border border-dashed border-slate-800 rounded-[3rem]">
            <AlertCircle className="mx-auto text-slate-700 mb-4" size={48}/>
            <h3 className="text-xl font-bold text-white mb-2">Publications Standby</h3>
            <p className="text-slate-500 text-sm mb-8 uppercase tracking-widest font-mono">Medium Feed Error</p>
            <a href={`https://medium.com/@${username}`} target="_blank" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold">
              Check articles on Medium <ExternalLink size={14}/>
            </a>
          </div>
        ) : (
          <div className="relative">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={articles.length > 3}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              speed={1000} // smooth transition
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              navigation={{
                nextEl: ".swiper-button-next-blog",
                prevEl: ".swiper-button-prev-blog"
              }}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="blog-swiper !pb-24 !px-10"
            >
              {articles.map((post, idx) => (
                <SwiperSlide key={idx} className="!w-[300px] md:!w-[420px]">
                  <a href={post.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col h-[520px] bg-slate-900/20 border border-slate-800/50 rounded-[2.5rem] overflow-hidden">
                    <div className="relative h-60 w-full overflow-hidden">
                      <img src={post.thumbnail} alt={post.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"/>
                      <div className="absolute top-5 left-5 px-3 py-1 bg-black/60 text-[10px] font-bold uppercase rounded-full text-white">
                        Medium
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-slate-500 text-[11px] mb-4 font-bold uppercase">
                        <Calendar size={14}/>
                        {new Date(post.pubDate).toLocaleDateString()}
                      </div>
                      <h3 className="text-white font-bold text-xl md:text-2xl leading-tight mb-6">{post.title}</h3>
                      <div className="mt-auto flex items-center justify-between border-t border-slate-800/50 pt-6">
                        <div className="flex gap-2">
                          {post.categories?.slice(0,2).map(cat => (
                            <span key={cat} className="text-[9px] px-3 py-1 rounded-full bg-slate-800 text-slate-400">{cat}</span>
                          ))}
                        </div>
                        <ExternalLink size={16}/>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              ))}

              {/* NAVIGATION ARROWS (CLOSE TO MAIN SLIDE) */}
              <div className="swiper-button-prev-blog absolute left-[calc(50%-220px)] top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 transition">
                <ChevronLeft size={26}/>
              </div>
              <div className="swiper-button-next-blog absolute right-[calc(50%-220px)] top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 border border-gray-700 flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 transition">
                <ChevronRight size={26}/>
              </div>
            </Swiper>
          </div>
        )}

      </div>

      {/* BUTTON */}
      <div className="mt-10 text-center">
        <a href={`https://medium.com/@${username}`} target="_blank" className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white">
          <BookOpen size={16}/> Explore All Publications
        </a>
      </div>

    </section>
  );
}