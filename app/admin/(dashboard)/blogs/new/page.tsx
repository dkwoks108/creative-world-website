"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BlockEditor, { PostEditorData } from "@/components/admin/editor/BlockEditor";

export default function NewBlogPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (data: PostEditorData) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success && result.post?.id) {
        router.push(`/admin/blogs/${result.post.id}/edit`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return <BlockEditor onSave={handleSave} isSaving={isSaving} />;
}
