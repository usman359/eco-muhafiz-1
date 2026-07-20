import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPage() {
  return (
    <>
      <div className="admin-page-header">
        <h1>New blog post</h1>
      </div>
      <div className="admin-card">
        <BlogForm />
      </div>
    </>
  );
}
