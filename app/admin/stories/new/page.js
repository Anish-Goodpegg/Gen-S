"use client";

import React, { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import StoryForm from '@/components/StoryForm';
import { useFirestore } from '@/hooks/useFirestore';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NewStoryPage() {
  const { addDocument } = useFirestore('stories');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await addDocument(data);
      if (result.success) {
        router.push('/admin/stories');
      }
      return result;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container px-4 py-10">
        <Link href="/admin/stories" className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Stories
        </Link>
        
        <h1 className="text-3xl font-bold tracking-tight mb-8">Create New Story</h1>
        
        <StoryForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </ProtectedRoute>
  );
}