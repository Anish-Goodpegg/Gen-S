import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarDays, User } from 'lucide-react';
import Link from 'next/link';

export default function StoryCard({ story }) {
  // Extract first 150 characters of content for preview
  const contentPreview = story.content
    ? story.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
    : '';

  return (
    <Card className="h-full flex flex-col overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative overflow-hidden h-48">
        <img
          src={story.imageUrl || 'https://images.pexels.com/photos/3952079/pexels-photo-3952079.jpeg'}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-2">{story.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground space-x-4">
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            <span>
              {story.createdAt && story.createdAt.toDate 
                ? format(story.createdAt.toDate(), 'MMM dd, yyyy') 
                : 'Date unavailable'}
            </span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1" />
            <span>{story.author || 'Admin'}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-3">{contentPreview}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link href={`/story/${story.id}`} className="w-full">
          <Button variant="default" className="w-full">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}