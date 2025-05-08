"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import StoryForm from '@/components/StoryForm';
import { useFirestore } from '@/hooks/useFirestore';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function EditStoryPage() {
  const { id } = useParams();
  const { updateDocument, getDocument } = useFirestore('stories');
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const result = await getDocument(id);
        if (result.success) {
          setStory(result.data);
        } else {
          setError(result.error || 'Failed to fetch story');
        }
      } catch (err) {
        console.error('Error fetching story:', err);
        setError('An error occurred while fetching the story');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, getDocument]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await updateDocument(id, data);
      if (result.success) {
        router.push('/admin/stories');
      }
      return result;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="container px-4 py-10 flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !story) {
    return (
      <ProtectedRoute>
        <div className="container px-4 py-10">
          <Link href="/admin/stories" className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Link>
          
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Error</h1>
            <p className="text-muted-foreground">{error || 'Story not found'}</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container px-4 py-10">
        <Link href="/admin/stories" className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Stories
        </Link>
        
        <h1 className="text-3xl font-bold tracking-tight mb-8">Edit Story</h1>
        
        <StoryForm 
          initialData={story}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </ProtectedRoute>
  );
}