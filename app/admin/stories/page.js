"use client";

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import StoriesTable from '@/components/StoriesTable';
import { useFirestore } from '@/hooks/useFirestore';
import { useStorage } from '@/hooks/useStorage';
import { toast } from 'sonner';

export default function AdminStoriesPage() {
  const { documents: stories, loading, deleteDocument } = useFirestore('stories');
  const { deleteFile } = useStorage();

  const handleDelete = async (id) => {
    // Find the story to get the image path if it exists
    const story = stories.find(s => s.id === id);
    
    try {
      // Delete the story document first
      const result = await deleteDocument(id);
      
      if (result.success) {
        // If the story has an image, delete it from storage
        if (story && story.imagePath) {
          await deleteFile(story.imagePath);
        }
        
        toast.success('Story deleted successfully');
        return { success: true };
      } else {
        toast.error(result.error || 'Failed to delete story');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error deleting story:', error);
      toast.error('An error occurred while deleting the story');
      return { success: false, error: error.message };
    }
  };

  return (
    <ProtectedRoute>
      <div className="container px-4 py-10">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Manage Stories</h1>
        <StoriesTable 
          stories={stories} 
          onDelete={handleDelete} 
          isLoading={loading} 
        />
      </div>
    </ProtectedRoute>
  );
}