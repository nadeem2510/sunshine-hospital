import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, User, Eye, ArrowRight, Search,
  Filter, Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [blogsRes, categoriesRes] = await Promise.all([
        axios.get(`${API_URL}/api/blogs`),
        axios.get(`${API_URL}/api/blog-categories`),
      ]);
      setBlogs(blogsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-purple-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Health <span className="text-purple-700">Blog</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Expert medical insights, health tips, and wellness advice from our 
              experienced doctors. Stay informed about your health with articles 
              covering various medical specialties.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-slate-200 rounded-full"
                  data-testid="blog-search-input"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[200px] bg-white border-slate-200 rounded-full" data-testid="blog-category-select">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-slate-100 rounded-2xl h-[400px] animate-pulse" />
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <>
              {/* Featured Blog (First One) */}
              {filteredBlogs.length > 0 && (
                <Link to={`/blog/${filteredBlogs[0].slug}`} className="block mb-12">
                  <Card 
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
                    data-testid="featured-blog-card"
                  >
                    <div className="grid md:grid-cols-2">
                      <div className="relative h-64 md:h-full overflow-hidden">
                        <img
                          src={filteredBlogs[0].featured_image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop"}
                          alt={filteredBlogs[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={`${categoryColors[filteredBlogs[0].category] || "bg-slate-100 text-slate-800"} font-medium`}>
                            {categoryLabels[filteredBlogs[0].category] || filteredBlogs[0].category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {filteredBlogs[0].author_name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {filteredBlogs[0].views} views
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-purple-700 transition-colors">
                          {filteredBlogs[0].title}
                        </h2>
                        <p className="text-slate-600 mb-6 line-clamp-3">
                          {filteredBlogs[0].excerpt}
                        </p>
                        <div className="flex items-center text-purple-700 font-semibold group-hover:gap-2 transition-all">
                          Read Article <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              )}

              {/* Other Blogs Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.slice(1).map((blog) => (
                  <Link to={`/blog/${blog.slug}`} key={blog.id || blog.slug}>
                    <Card 
                      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
                      data-testid={`blog-card-${blog.slug}`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={blog.featured_image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop"}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={`${categoryColors[blog.category] || "bg-slate-100 text-slate-800"} font-medium text-xs`}>
                            {categoryLabels[blog.category] || blog.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {blog.author_name}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {blog.views}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {blog.excerpt}
                        </p>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {blog.tags.slice(0, 3).map((tag, i) => (
                              <span 
                                key={i}
                                className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Have Health Questions?
          </h2>
          <p className="text-purple-200 text-lg mb-8">
            Our expert doctors are here to help. Book a consultation today.
          </p>
          <Link to="/contact">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg text-lg">
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
