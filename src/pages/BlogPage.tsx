import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BookOpen, Search, ChevronRight, Calendar, User } from "lucide-react";
import { useLanguage } from "../utils/LanguageContext";

interface BlogPostData {
  _id: string;
  title: string;
  titleTa?: string;
  slug: string;
  excerpt: string;
  excerptTa?: string;
  category: string;
  author: string;
  publishDate: string;
  tags: string[];
}

export const BlogPage: React.FC = () => {
  const { language } = useLanguage();
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        } else {
          throw new Error("Load failed");
        }
      } catch (err) {
        const fallbackBlogs = [
          {
            _id: "blog1",
            title: "Best Neurosurgery Hospital in Salem: What Patients Should Know",
            slug: "best-neurosurgery-hospital-in-salem",
            excerpt: "How advanced diagnostic facilities, senior clinical leadership, and microsurgery theaters combine to offer world-class outcomes.",
            category: "Neurosurgery",
            author: "Clinical Team",
            publishDate: new Date().toISOString(),
            tags: ["Neurosurgery", "Salem", "Health Tips"]
          },
          {
            _id: "blog2",
            title: "Understanding Stroke Symptoms: Act FAST",
            slug: "understanding-stroke-symptoms-fast",
            excerpt: "Learn how to recognize immediate stroke symptoms and coordinate urgent transfer to an advanced neuro emergency center.",
            category: "Neurology",
            author: "Clinical Team",
            publishDate: new Date().toISOString(),
            tags: ["Stroke", "Neurology", "Emergency"]
          },
          {
            _id: "blog3",
            title: "தலைகாயம் குறித்த விழிப்புணர்வு கையேடு | Head Injury Manual",
            slug: "head-injury-manual-tamil",
            excerpt: "தலைகாயங்களை பற்றி நீங்கள் எளிதாக புரிந்து கொள்ள மற்றும் சிகிச்சைகளை தெரிந்து கொள்ள இந்த கையேடு உதவும்.",
            category: "Neurosurgery",
            author: "Prof. Dr. V. Suresh Kumar",
            publishDate: new Date().toISOString(),
            tags: ["Head Injury", "Tamil", "Neurosurgery", "Clinical Guidelines"]
          }
        ];
        setPosts(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.titleTa && post.titleTa.toLowerCase().includes(searchQuery.toLowerCase())) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (post.excerptTa && post.excerptTa.toLowerCase().includes(searchQuery.toLowerCase())) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Health Advice & Clinical Blog | SarvamCare Hospital Salem</title>
        <meta name="description" content="Read expert medical articles reviewed by our consulting neurosurgeons, orthopaedicians, and trauma ICU specialists on symptoms and preventive care." />
        <link rel="canonical" href="https://sarvamcarehospital.in/blog" />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24 text-center md:text-left">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#D8B35A] uppercase block">
            Health & Wellness
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mt-2 leading-tight">
            Sarvam Care Blog
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mx-auto md:mx-0 mt-4.5" />
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-[#FAF7FF] py-16 md:py-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search bar */}
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#665A70]" />
              <input
                type="text"
                placeholder="Search health topics and categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-xs bg-white border border-[#EDE4F7] rounded-full focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#D8B35A] focus:border-[#D8B35A] transition-all text-[#24152F] shadow-sm"
              />
            </div>
          </div>

          {/* Grid list */}
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="h-8 w-8 border-2 border-brand-purple border-t-brand-gold rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map(post => (
                <div key={post._id} className="flex flex-col justify-between p-6 md:p-8 rounded-3xl border border-[#EDE4F7] bg-white shadow-sm hover:shadow-md transition-all">
                  <div>
                    {/* Meta */}
                    <div className="flex items-center gap-3 text-[10px] text-[#665A70] font-bold uppercase tracking-wider mb-3.5">
                      <span className="bg-[#FAF7FF] text-[#6D2FA0] border border-[#EDE4F7] px-2.5 py-0.5 rounded-full font-bold">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 font-light">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                      </span>
                    </div>

                     <h3 className="font-serif text-lg md:text-xl font-bold text-[#32105F] hover:text-[#6D2FA0] transition-colors leading-tight">
                      <Link to={`/blog/${post.slug}`}>{(language === "ta" && post.titleTa) ? post.titleTa : post.title}</Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#665A70] leading-relaxed font-light font-sans mt-3">
                      {(language === "ta" && post.excerptTa) ? post.excerptTa : post.excerpt}
                    </p>
                  </div>

                  {/* Read trigger */}
                  <div className="mt-6 pt-4 border-t border-[#F3EDFA] flex items-center justify-between">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-xs font-bold text-[#6D2FA0] hover:text-[#32105F] flex items-center gap-0.5 transition-colors"
                    >
                      <span>{language === "ta" ? "கட்டுரையை முழுமையாக வாசிக்க" : "Read Full Article"}</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#665A70] font-light">
                      <User className="h-3.5 w-3.5 text-[#D8B35A]" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-16 border border-dashed border-[#EDE4F7] rounded-3xl max-w-md mx-auto bg-white shadow-sm">
              <BookOpen className="h-9 w-9 text-[#D8B35A] mx-auto animate-pulse mb-4" />
              <h3 className="font-serif font-bold text-[#32105F] text-base">No articles found</h3>
              <p className="text-xs text-[#665A70] font-light mt-1.5 px-4">
                We couldn't find matching health topics for "{searchQuery}". Try modifying your queries.
              </p>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default BlogPage;
