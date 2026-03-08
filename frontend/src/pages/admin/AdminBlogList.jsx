import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Plus, Edit, Trash2, Eye, EyeOff, Search,
  FileText, ArrowLeft, MoreVertical, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const API_URL = process.env.REACT_APP_BACKEND_URL;

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

export default function AdminBlogList() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blogs?published_only=false`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    
    try {
      await axios.delete(`${API_URL}/api/blogs/${blogToDelete.slug}`);
      toast.success("Blog post deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog post");
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  const togglePublish = async (blog) => {
    try {
      await axios.put(`${API_URL}/api/blogs/${blog.slug}`, {
        is_published: !blog.is_published
      });
      toast.success(blog.is_published ? "Blog unpublished" : "Blog published");
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog status");
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="text-purple-700 hover:text-purple-800"
                data-testid="admin-back-home"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Blog Admin</h1>
                <p className="text-sm text-slate-500">Manage your medical articles</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500 hidden sm:block">
                Welcome, {user?.username}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-slate-600"
                data-testid="logout-btn"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Link to="/admin/blog/new">
                <Button 
                  className="bg-amber-500 hover:bg-amber-600 text-white rounded-full"
                  data-testid="new-blog-btn"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Article
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{blogs.length}</p>
                  <p className="text-xs text-slate-500">Total Articles</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {blogs.filter(b => b.is_published).length}
                  </p>
                  <p className="text-xs text-slate-500">Published</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <EyeOff className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {blogs.filter(b => !b.is_published).length}
                  </p>
                  <p className="text-xs text-slate-500">Drafts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {blogs.reduce((sum, b) => sum + (b.views || 0), 0)}
                  </p>
                  <p className="text-xs text-slate-500">Total Views</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white"
              data-testid="admin-search-input"
            />
          </div>
        </div>

        {/* Blog List */}
        <Card>
          <CardHeader>
            <CardTitle>All Articles</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 bg-slate-100 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No articles found</p>
                <Link to="/admin/blog/new">
                  <Button className="mt-4 bg-purple-700 hover:bg-purple-800 text-white">
                    Create Your First Article
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredBlogs.map((blog) => (
                  <div 
                    key={blog.id || blog.slug}
                    className="py-4 flex items-center justify-between hover:bg-slate-50 -mx-4 px-4 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {blog.featured_image && (
                        <img
                          src={blog.featured_image}
                          alt=""
                          className="w-16 h-12 object-cover rounded-lg hidden sm:block"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-900 truncate">
                            {blog.title}
                          </h3>
                          {blog.is_published ? (
                            <Badge className="bg-green-100 text-green-800 text-xs">Published</Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-800 text-xs">Draft</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>{categoryLabels[blog.category] || blog.category}</span>
                          <span>•</span>
                          <span>{blog.author_name}</span>
                          <span>•</span>
                          <span>{blog.views || 0} views</span>
                        </div>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`blog-actions-${blog.slug}`}>
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/admin/blog/edit/${blog.slug}`)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => togglePublish(blog)}>
                          {blog.is_published ? (
                            <>
                              <EyeOff className="w-4 h-4 mr-2" />
                              Unpublish
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              Publish
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => {
                            setBlogToDelete(blog);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{blogToDelete?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
