"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Clock, Bookmark, Share2, ThumbsUp, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function StoryPage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const docRef = doc(db, 'stories', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setStory({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Story not found');
        }
      } catch (err) {
        console.error('Error fetching story:', err);
        setError('Failed to load story');
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="container px-4 md:px-6 py-10 mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p className="text-muted-foreground mb-6">{error || 'Story not found'}</p>
        <Button asChild>
          <Link href="/stories">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Link>
        </Button>
      </div>
    );
  }

  const formattedDate = story.createdAt && story.createdAt.toDate 
    ? format(story.createdAt.toDate(), 'MMMM dd, yyyy') 
    : 'Date unavailable';

  return (
    <div className="container px-4 md:px-6 py-10 mx-auto">
      <Link href="/stories" className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Stories
      </Link>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{story.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{story.author || 'Admin'}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>5 min read</span>
          </div>
        </div>
        
        {story.imageUrl && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <img
              src={story.imageUrl}
              alt={story.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: story.content || '' }} />
        </div>
        
        <div className="border-t mt-12 pt-6 flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="flex items-center">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <Link href="/stories">
              <Button variant="ghost" size="sm">
                Read more stories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}