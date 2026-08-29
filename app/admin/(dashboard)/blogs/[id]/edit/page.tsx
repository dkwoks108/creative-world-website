"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import BlockEditor, { PostEditorData } from "@/components/admin/editor/BlockEditor";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const [postData, setPostData] = useState<Partial<PostEditorData> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/admin/posts/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.post) {
            let parsedBlocks = [];
            try {
              parsedBlocks = JSON.parse(data.post.content);
            } catch (e) {
              console.error("Failed to parse blocks JSON:", e);
            }

            setPostData({
              id: data.post.id,
              title: data.post.title,
              slug: data.post.slug,
              excerpt: data.post.excerpt,
              status: data.post.status,
              featuredImage: data.post.featuredImage,
              seoTitle: data.post.seoTitle,
              metaDescription: data.post.metaDescription,
              blocks: Array.isArray(parsedBlocks) ? parsedBlocks : [],
              revisions: data.post.revisions || [],
            });
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [params.id]);

  const handleSave = async (data: PostEditorData) => {
    setIsSaving(true);
    try {
      await fetch(`/api/admin/posts/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)] bg-[#090D14] text-xs text-slate-400">
        Loading post into Gutenberg Block Canvas...
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)] bg-[#090D14] text-xs text-rose-400 font-bold">
        Article not found.
      </div>
    );
  }

  return <BlockEditor initialData={postData} onSave={handleSave} isSaving={isSaving} />;
}
