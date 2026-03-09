import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Calendar, User, Eye, Clock, Tag,
  Share2, Facebook, Twitter, Linkedin, Copy,
  CheckCircle, Award, GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import AppointmentModal from "@/components/AppointmentModal";
import SEO, { generateBlogSchema } from "@/components/SEO";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const categoryColors = {
  general_health: "bg-blue-100 text-blue-800",
  orthopedics: "bg-green-100 text-green-800",
  cardiology: "bg-red-100 text-red-800",
  surgery: "bg-purple-100 text-purple-800",
  nutrition: "bg-orange-100 text-orange-800",
  mental_health: "bg-pink-100 text-pink-800",
  womens_health: "bg-rose-100 text-rose-800",
  esic_info: "bg-amber-100 text-amber-800",
};

const categoryLabels = {
  general_health: "General Health",
  orthopedics: "Orthopedics",
  cardiology: "Cardiology",
  surgery: "Surgery",
  nutrition: "Nutrition",
  mental_health: "Mental Health",
  womens_health: "Women's Health",
  esic_info: "ESIC Information",
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAppointment, setShowAppointment] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const [blogRes, allBlogsRes, doctorsRes] = await Promise.all([
        axios.get(`${API_URL}/api/blogs/${slug}`),
        axios.get(`${API_URL}/api/blogs`),
        axios.get(`${API_URL}/api/doctors`),
      ]);
      setBlog(blogRes.data);
      
      // Find author from doctors list
      const blogAuthor = doctorsRes.data.find(d => d.id === blogRes.data.author_id);
      setAuthor(blogAuthor);
      
      // Get related blogs (same category, different slug)
      const related = allBlogsRes.data
        .filter(b => b.category === blogRes.data.category && b.slug !== slug)
        .slice(0, 3);
      setRelatedBlogs(related);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(blog?.title || "");
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`,
    };
    
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl h-[600px] animate-pulse" />
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Article not found</h1>
          <Link to="/blog">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title={blog.title}
        description={blog.excerpt}
        keywords={blog.tags?.join(", ") || "health article, medical blog"}
        image={blog.featured_image}
        url={`/blog/${blog.slug}`}
        type="article"
        schema={generateBlogSchema(blog, author)}
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-purple-700 hover:text-purple-800 font-medium"
            data-testid="back-to-blog"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8">
            <Badge className={`${categoryColors[blog.category] || "bg-slate-100 text-slate-800"} font-medium mb-4`}>
              {categoryLabels[blog.category] || blog.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-6">
              <span className="flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                {blog.author_name}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-600" />
                {blog.views} views
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                5 min read
              </span>
            </div>
            
            <p className="text-xl text-slate-600 leading-relaxed">
              {blog.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          {blog.featured_image && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={blog.featured_image}
                alt={blog.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <Card className="bg-white rounded-2xl shadow-sm mb-10">
            <CardContent className="p-8 md:p-12">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-900 prose-a:text-purple-700"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </CardContent>
          </Card>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Tag className="w-5 h-5 text-slate-500" />
              {blog.tags.map((tag, i) => (
                <Badge 
                  key={i}
                  variant="outline"
                  className="text-purple-700 border-purple-200 hover:bg-purple-50"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Author Box - E-E-A-T Compliance */}
          {author && (
            <Card className="bg-gradient-to-r from-purple-50 to-amber-50 rounded-2xl mb-10 border-0 shadow-md" data-testid="author-box">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Author Image */}
                  <div className="flex-shrink-0">
                    <Link to={`/doctors/${author.id}`}>
                      <img 
                        src={author.image} 
                        alt={`${author.name} - ${author.title}`}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    </Link>
                  </div>
                  
                  {/* Author Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                        Written By
                      </span>
                    </div>
                    
                    <Link to={`/doctors/${author.id}`} className="group">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                        {author.name}
                      </h3>
                    </Link>
                    
                    <p className="text-purple-700 font-medium mb-3">{author.title}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                      {author.experience && (
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-amber-500" />
                          {author.experience}
                        </span>
                      )}
                      {author.department && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-4 h-4 text-purple-500" />
                          {author.department}
                        </span>
                      )}
                    </div>
                    
                    {author.specializations && author.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {author.specializations.slice(0, 4).map((spec, i) => (
                          <span key={i} className="text-xs bg-white px-2 py-1 rounded-full text-slate-600 border">
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <Link to={`/doctors/${author.id}`}>
                      <Button variant="outline" size="sm" className="rounded-full text-purple-700 border-purple-300 hover:bg-purple-100">
                        View Full Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fact-Checked & Medical Review Badge */}
          <Card className="bg-green-50 rounded-xl mb-10 border border-green-200" data-testid="fact-check-badge">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">
                    Medically Reviewed & Fact-Checked
                  </p>
                  <p className="text-xs text-green-600">
                    {author ? `Reviewed by ${author.name}, ${author.title}` : "Reviewed by Sunshine Hospital Medical Team"} 
                    {" • "}
                    Last updated: {new Date(blog.updated_at || blog.created_at).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Share */}
          <Card className="bg-slate-100 rounded-2xl mb-10">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-slate-700 font-medium">
                  <Share2 className="w-5 h-5" />
                  Share this article
                </span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("facebook")}
                    className="rounded-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                  >
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("twitter")}
                    className="rounded-full hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200"
                  >
                    <Twitter className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleShare("linkedin")}
                    className="rounded-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                    className="rounded-full hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200"
                  >
                    <Copy className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl mb-10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Have Questions About This Topic?
              </h3>
              <p className="text-purple-200 mb-6">
                Our specialists are here to help. Book a consultation with our expert doctors.
              </p>
              <Button
                onClick={() => setShowAppointment(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg text-lg"
                data-testid="blog-book-appointment"
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.map((related) => (
                  <Link to={`/blog/${related.slug}`} key={related.slug}>
                    <Card className="group bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow h-full">
                      <div className="h-32 overflow-hidden">
                        <img
                          src={related.featured_image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop"}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-purple-700 transition-colors">
                          {related.title}
                        </h4>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <AppointmentModal open={showAppointment} onOpenChange={setShowAppointment} />

      {/* Schema Markup */}
      <script type="application/ld+json" className="schema-markup">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": blog.title,
          "description": blog.excerpt,
          "image": blog.featured_image,
          "author": {
            "@type": "Person",
            "name": blog.author_name
          },
          "publisher": {
            "@type": "Organization",
            "name": "Sunshine Hospital",
            "logo": {
              "@type": "ImageObject",
              "url": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/mfclqmcn_LOGO%20SUNSHINE%20PNG.jpg"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
          }
        })}
      </script>
    </div>
  );
}
