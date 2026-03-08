import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Save, Eye, Image, Tag, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function AdminBlogEditor() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEditing = Boolean(slug);
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [tagInput, setTagInput] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    author_id: "",
    featured_image: "",
    tags: [],
    is_published: false,
  });

  useEffect(() => {
    fetchInitialData();
  }, [slug]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, doctorsRes] = await Promise.all([
        axios.get(`${API_URL}/api/blog-categories`),
        axios.get(`${API_URL}/api/doctors`),
      ]);
      setCategories(categoriesRes.data);
      setDoctors(doctorsRes.data);

      if (isEditing) {
        const blogRes = await axios.get(`${API_URL}/api/blogs/${slug}`);
        setFormData({
          title: blogRes.data.title || "",
          slug: blogRes.data.slug || "",
          excerpt: blogRes.data.excerpt || "",
          content: blogRes.data.content || "",
          category: blogRes.data.category || "",
          author_id: blogRes.data.author_id || "",
          featured_image: blogRes.data.featured_image || "",
          tags: blogRes.data.tags || [],
          is_published: blogRes.data.is_published || false,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (isEditing) {
        toast.error("Failed to load blog post");
        navigate("/admin/blog");
      }
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: isEditing ? formData.slug : generateSlug(title),
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content || !formData.category || !formData.author_id) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.excerpt.length < 20) {
      toast.error("Excerpt must be at least 20 characters");
      return;
    }

    if (formData.content.length < 100) {
      toast.error("Content must be at least 100 characters");
      return;
    }

    setSaving(true);
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/api/blogs/${slug}`, formData);
        toast.success("Blog post updated successfully");
      } else {
        await axios.post(`${API_URL}/api/blogs`, formData);
        toast.success("Blog post created successfully");
      }
      navigate("/admin/blog");
    } catch (error) {
      console.error("Error saving blog:", error);
      const message = error.response?.data?.detail || "Failed to save blog post";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-700" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin/blog" className="text-purple-700 hover:text-purple-800" data-testid="back-to-list">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-bold text-slate-900">
                {isEditing ? "Edit Article" : "New Article"}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {formData.slug && (
                <Button variant="outline" onClick={() => window.open(`/blog/${formData.slug}`, '_blank')} className="hidden sm:flex" data-testid="preview-btn">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              )}
              <Button onClick={handleSubmit} disabled={saving} className="bg-amber-500 hover:bg-amber-600 text-white" data-testid="save-blog-btn">
                {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : <><Save className="w-4 h-4 mr-2" />{isEditing ? "Update" : "Save"}</>}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                    <Input id="title" placeholder="Enter article title" value={formData.title} onChange={handleTitleChange} className="text-lg font-medium" data-testid="blog-title-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug <span className="text-red-500">*</span></Label>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-sm">/blog/</span>
                      <Input id="slug" placeholder="article-url-slug" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="flex-1" data-testid="blog-slug-input" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-lg">Excerpt</CardTitle></CardHeader>
                <CardContent>
                  <Textarea placeholder="Write a brief summary (20-500 characters)..." value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="min-h-[100px]" data-testid="blog-excerpt-input" />
                  <p className="text-xs text-slate-500 mt-2">{formData.excerpt.length}/500 characters</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-lg">Content</CardTitle></CardHeader>
                <CardContent>
                  <Textarea placeholder="Write your article content. Use HTML tags like <h2>, <p>, <ul>, <li>, <strong> for formatting..." value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="min-h-[400px] font-mono text-sm" data-testid="blog-content-input" />
                  <p className="text-xs text-slate-500 mt-2">Supports HTML. Min 100 chars. Current: {formData.content.length}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-lg">Publish</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div><p className="font-medium text-slate-900">Status</p><p className="text-sm text-slate-500">{formData.is_published ? "Published" : "Draft"}</p></div>
                    <Switch checked={formData.is_published} onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })} data-testid="publish-switch" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-lg">Category</CardTitle></CardHeader>
                <CardContent>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger data-testid="category-select"><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>{categories.map((cat) => (<SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>))}</SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-lg">Author</CardTitle></CardHeader>
                <CardContent>
                  <Select value={formData.author_id} onValueChange={(value) => setFormData({ ...formData, author_id: value })}>
                    <SelectTrigger data-testid="author-select"><SelectValue placeholder="Select author" /></SelectTrigger>
                    <SelectContent>{doctors.map((doctor) => (<SelectItem key={doctor.id} value={doctor.id}>{doctor.name}</SelectItem>))}</SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-lg flex items-center gap-2"><Image className="w-4 h-4" />Featured Image</CardTitle></CardHeader>
                <CardContent>
                  <Input placeholder="Enter image URL" value={formData.featured_image} onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })} data-testid="featured-image-input" />
                  {formData.featured_image && (<div className="mt-3 rounded-lg overflow-hidden border border-slate-200"><img src={formData.featured_image} alt="Featured" className="w-full h-32 object-cover" onError={(e) => e.target.style.display = 'none'} /></div>)}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3"><CardTitle className="text-lg flex items-center gap-2"><Tag className="w-4 h-4" />Tags</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-3">
                    <Input placeholder="Add tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); }}} data-testid="tag-input" />
                    <Button type="button" variant="outline" onClick={() => addTag()} data-testid="add-tag-btn">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, i) => (<Badge key={i} variant="secondary" className="cursor-pointer hover:bg-red-100 hover:text-red-800" onClick={() => removeTag(tag)}>{tag} ×</Badge>))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
