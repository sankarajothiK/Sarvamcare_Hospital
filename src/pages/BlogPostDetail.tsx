import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { contactInfo } from "../data/contact";

interface BlogPostData {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML string
  category: string;
  author: string;
  publishDate: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
}

export const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  const formatBlogContent = (content: string) => {
    if (!content) return "";
    // If it already has HTML tags, render it as-is
    if (/<[a-z][\s\S]*>/i.test(content)) {
      return content;
    }
    // If it's plain text, convert newlines to paragraph tags/breaks
    return content
      .split(/\n\n+/)
      .map(para => `<p>${para.replace(/\n/g, "<br />")}</p>`)
      .join("\n");
  };

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          throw new Error("API load failed");
        }
      } catch (err) {
        const fallbackBlogs = [
          {
            _id: "blog1",
            title: "Best Neurosurgery Hospital in Salem: What Patients Should Know",
            slug: "best-neurosurgery-hospital-in-salem",
            excerpt: "How advanced diagnostic facilities, senior clinical leadership, and microsurgery theaters combine to offer world-class outcomes.",
            content: "<h3>Advanced Neurosurgical Standards in Salem</h3><p>When selecting a center for complex brain or spine surgeries, technology and surgical experience play key roles. SarvamCare Hospital features a dedicated Neuro Center utilizing high-resolution microscopic instrumentation, intraoperative monitoring, and senior leadership under Chief Consultant Dr. V. Suresh Kumar.</p><h4>Why Infrastructure Matters</h4><p>Microscopic precision reduces tissue damage, improves recovery windows, and raises the safety profile of skull-base and aneurysm surgeries.</p><h4>About Prof. Dr. V. Suresh Kumar</h4><p>Prof. Dr. V. Suresh Kumar is a senior neurosurgeon in Salem, Tamil Nadu with over 25 years of specialized clinical leadership. He is the active Prof & HOD of the Department of Neurosurgery at Government Mohan Kumaramangalam Medical College, Salem.</p>",
            category: "Neurosurgery",
            author: "Clinical Team",
            publishDate: new Date().toISOString(),
            tags: ["Neurosurgery", "Salem", "Health Tips"],
            seoTitle: "Best Neurosurgery Hospital in Salem | Clinical Overview",
            seoDescription: "Review microscopic neurosurgery and brain spine surgical standards at SarvamCare Mamangam Salem led by Dr. V. Suresh Kumar."
          },
          {
            _id: "blog2",
            title: "Understanding Stroke Symptoms: Act FAST",
            slug: "understanding-stroke-symptoms-fast",
            excerpt: "Learn how to recognize immediate stroke symptoms and coordinate urgent transfer to an advanced neuro emergency center.",
            content: "<h3>Stroke is a Medical Emergency</h3><p>A stroke occurs when blood flow to the brain is interrupted or reduced. Acting quickly can save lives and limit long-term disability.</p><h4>The FAST Test</h4><ul><li><strong>F - Face Drooping</strong>: Ask the person to smile. Does one side droop?</li><li><strong>A - Arm Weakness</strong>: Ask to raise both arms. Does one drift downward?</li><li><strong>S - Speech Difficulty</strong>: Is speech slurred or strange?</li><li><strong>T - Time to Call</strong>: Call the helpline (+91 94898 78908) immediately.</li></ul><p>SarvamCare Hospital features 24/7 dedicated stroke emergency bays, CT scanning units, and neuro-critical ICU beds to receive stroke patients.</p>",
            category: "Neurology",
            author: "Clinical Team",
            publishDate: new Date().toISOString(),
            tags: ["Stroke", "Neurology", "Emergency"],
            seoTitle: "Recognize Stroke Symptoms FAST | SarvamCare Salem",
            seoDescription: "A simple diagnostic FAST checklist to identify a stroke. Contact SarvamCare's 24/7 emergency neuro helpline immediately."
          },
          {
            _id: "blog3",
            title: "தலைகாயம் குறித்த விழிப்புணர்வு கையேடு | Head Injury Manual",
            slug: "head-injury-manual-tamil",
            excerpt: "தலைகாயங்களை பற்றி நீங்கள் எளிதாக புரிந்து கொள்ள மற்றும் சிகிச்சைகளை தெரிந்து கொள்ள இந்த கையேடு உதவும்.",
            content: "<h3>தலைகாயம் குறித்த விழிப்புணர்வு கையேடு (Head Injury Manual)</h3><p>தலைகாயங்களை பற்றி நீங்கள் எளிதாக புரிந்து கொள்ள இந்த கையேடு உதவும். தலைகாயத்தினால் ஏற்படும் மூளை பாதிப்புகளில் இருந்து எவ்வளவு தூரம் குணமடைவார்கள் என்பது தலைகாயத்தின் தீவிரம் மற்றும் எவ்வளவு விரைவாக சிகிச்சைகளை தொடங்குகிறோம் என்பதை பொறுத்தே அமைகிறது.</p><h4>Glasgow Coma Scale (GCS) - கோமா அளவுகோல்</h4><p>தலைகாயத்தின் தீவிர தன்மையை கோமா அளவுகோலின் படி (கிளாஸ்கோ கோமா அளவுகோல் - GCS) நீங்களே மதிப்பிடலாம். 13 புள்ளிகளுக்கு குறைவாக உள்ள நோயாளிகள் எவ்வளவு தூரம் குணமடைவார்கள், சுய உணர்வு திரும்புமா என்பதை தெரிந்து கொள்ளவே 5 முதல் 7 நாட்கள் தேவைப்படும். ஏனென்றால் மூளையில் ஏற்பட்ட இரத்த கசிவுகள் சுமார் 20% (10 பேரில் 2 பேருக்கு) அதிகரிக்கலாம். மேலும் மூளை வீக்கமானது முதல் 5 முதல் 7 நாட்கள் வரை அதிகமாகி பின்பு குறைய ஆரம்பிக்கும்.</p><h5>அதிக ஆபத்துள்ளவர்கள் (High-Risk Groups):</h5><ul><li>வயதானவர்கள் (60 வயதிற்கு மேல்)</li><li>சர்க்கரை / உயர் இரத்த அழுத்தம் உள்ளவர்கள்</li><li>மதுபோதையில் உள்ளவர்கள்</li><li>இரத்தம் உறைவதை தடுக்கும் மருந்து சாப்பிடுபவர்கள்</li><li>அதிக அளவில் இரத்த கசிவினால் பாதிக்கப்பட்டவர்கள்</li></ul><h4>தலைகாயத்திற்கான 3 கட்ட சிகிச்சை முறைகள்</h4><p>தலைகாயத்திற்கான (வைத்திய) சிகிச்சை முறைகள் மூளையில் ஏற்பட்ட பாதிப்புகளை பொறுத்து மூன்று கட்டங்களாக உள்ளது:</p><ol><li><strong>முதல் கட்டம்:</strong> மருந்துகள் மூலம் மூளை வீக்கத்தை கட்டுப்படுத்துவது.</li><li><strong>இரண்டாவது கட்டம்:</strong> செயற்கை சுவாச கருவியில் (வெண்டிலேட்டர்) ICUவில் வைத்திருப்பது. <em>பின்குறிப்பு:</em> மூச்சு விடமுடியாமல் (சுவாசிக்க) இருப்பவர்களை வெண்டிலேட்டரில் வைத்திருப்பது போல் அல்ல, இது மூளை வீக்கத்தை கட்டுப்படுத்துவது ஒரு (வைத்திய) சிகிச்சை முறை.</li><li><strong>மூன்றாம் கட்டம்:</strong> மருந்து மற்றும் வெண்டிலேட்டர் சிகிச்சைகளால் பலன் இல்லாத நிலையில் <strong>தலைகாய அறுவைசிகிச்சை (Neurosurgery)</strong> மேற்கொள்ளப்படும்.</li></ol><h4>தலைகாய அறுவைசிகிச்சை என்றால் என்ன?</h4><p>தலைகாய அறுவைசிகிச்சை (Decompressive Craniectomy) என்பது மண்டை ஓட்டை (கபால எலும்பு - Skull Bone) திறந்து மூளை விரிவடைய இடத்தை (Space) உருவாக்குவது மட்டும்தான். (அடிபட்ட) காயம்பட்ட மூளை அதுவாகத்தான் குணமாக வேண்டும். தலைகாய அறுவை சிகிச்சையை மற்ற அறுவை சிகிச்சைகளுடன் ஒப்பிட கூடாது.</p><p>மேற்சொன்ன இந்த மூன்று வகையான (வைத்திய) சிகிச்சை முறைகள் ஒரே நோயாளிக்கும் ஒரே சமயத்திலும் தேவைப்படலாம். நீங்கள் எந்த பெரிய மருத்துவமனைக்கு சென்றாலும், எவ்வளவு செலவு செய்ய தயாராக இருந்தாலும் மேற்சொன்ன 3 சிகிச்சை முறைகளை தாண்டி எதுவும் செய்வதற்கில்லை.</p><h4>நவீன வசதிகள் மற்றும் நிபுணர்கள்</h4><p>மேற்சொன்ன (வைத்திய) சிகிச்சை முறைகளை தடங்கல் இன்றி செய்வதற்கு தேவையான நவீன மற்றும் மருத்துவ நிபுணர்கள் (ஸ்பெஷலிஸ்ட்) வசதிகள் நமது மருத்துவமனையில் தயாராக உள்ளன. மருத்துவர்களின் கடமையானது நோயாளிகளின் பாதிப்புகளை சரியாக கண்டுபிடித்து அதற்கு தேவையான சிகிச்சைகளை தாமதமின்றி செய்வது மட்டுமே. சிகிச்சையின் பலனை மருத்துவர்கள் மட்டுமே தீர்மானிக்க முடியாது.</p><p>மேற்கொண்டு இம்மருத்துவமனையில் சிகிச்சையை தொடர்வது உங்களது முடிவாகும். சிகிச்சையை தொடரும் பட்சத்தில் உங்கள் நோயாளி குறித்த சிகிச்சை விபரங்களை (டிரீட்மெண்ட் சம்மரி - Treatment Summary) எங்களிடம் பெற்றுக்கொண்டு மற்ற தலைகாய மருத்துவ நிபுணர்களை கலந்தாலோசிக்கவும் உங்களை கேட்டுக்கொள்கிறோம்.</p>",
            category: "Neurosurgery",
            author: "Prof. Dr. V. Suresh Kumar",
            publishDate: new Date().toISOString(),
            tags: ["Head Injury", "Tamil", "Neurosurgery", "Clinical Guidelines"],
            seoTitle: "தலைகாயம் விழிப்புணர்வு கையேடு | Head Injury Manual Salem",
            seoDescription: "தலைகாயத்தின் தீவிர தன்மை, Glasgow Coma Scale (GCS) மற்றும் தலைகாயத்திற்கான 3 கட்ட சிகிச்சை முறைகள் பற்றிய விழிப்புணர்வு கையேடு."
          }
        ];
        const matched = fallbackBlogs.find(p => p.slug === slug);
        setPost(matched || null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7FF]">
        <div className="h-10 w-10 border-2 border-brand-purple border-t-brand-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF7FF] px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#32105F] mb-2">Article Not Found</h2>
        <p className="text-xs text-[#665A70] mb-6">The blog post you are trying to view is no longer available.</p>
        <Link to="/blog" className="px-6 py-2.5 bg-[#32105F] text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Clinical Blog</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.seoTitle || `${post.title} | SarvamCare Hospital`}</title>
        <meta name="description" content={post.seoDescription || post.excerpt} />
        <link rel="canonical" href={post.canonicalUrl || `https://sarvamcarehospital.in/blog/${slug}`} />
      </Helmet>

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#32105F] pt-32 pb-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#7E3DB5] blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-[#D8B35A] hover:text-white font-bold uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Health Blog</span>
          </Link>
          <div className="flex items-center gap-3 text-[10px] text-indigo-200 font-bold uppercase tracking-wider mb-3">
            <span className="bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-full">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-light">
              <Calendar className="h-3.5 w-3.5 text-[#D8B35A]" />
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>
          <div className="h-[2px] w-14 bg-[#D8B35A] mt-5" />
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="bg-white py-16 md:py-24 font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content (HTML renderer) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Blog body text */}
              <div 
                className="prose prose-slate max-w-none text-sm sm:text-base text-[#665A70] leading-relaxed font-light font-sans space-y-4"
                dangerouslySetInnerHTML={{ __html: formatBlogContent(post.content) }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-6 border-t border-[#F3EDFA]">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] bg-[#FAF7FF] text-[#6D2FA0] border border-[#EDE4F7] px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Author Info */}
              <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-[#FAF7FF] text-center space-y-4 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-[#32105F] text-white flex items-center justify-center font-bold text-xs mx-auto border border-[#D8B35A]/30 shadow-sm">
                  CT
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] text-[#665A70] font-bold uppercase tracking-wider block">Reviewed By</span>
                  <h4 className="text-xs font-bold text-[#32105F]">{post.author}</h4>
                  <p className="text-[8px] text-[#665A70] font-light">Medical Review Team</p>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="p-6 rounded-2xl border border-[#EDE4F7] bg-white text-center space-y-4 shadow-sm">
                <h4 className="font-serif text-sm font-bold text-[#32105F]">Need Medical Advice?</h4>
                <p className="text-[10px] text-[#665A70] font-light leading-relaxed">
                  Connect directly with our specialist outpatient helpdesk coordinators.
                </p>
                <div className="space-y-2 pt-2">
                  <a
                    href={`tel:${contactInfo.phoneRaw}`}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-[#32105F] hover:bg-[#3D176E] transition-all"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call Helpline</span>
                  </a>
                  <a
                    href={contactInfo.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-green-600 hover:bg-green-700 transition-all"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPostDetail;
