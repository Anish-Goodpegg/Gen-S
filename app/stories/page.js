"use client";

import React, { useState, useEffect } from 'react'; // Import useEffect
import { useSearchParams } from 'next/navigation';
// Assuming you have a way to get the Firestore db instance,
// e.g., from a utility file
import { db } from '@/lib/firebase'; // Make sure you have this utility
// import { collection, query, where, getDocs } from 'firebase/firestore'; 
// import { useFirestore } from '@/hooks/useFirestore'; // We will modify/replace the use of this hook for category filtering

import StoryCard from '@/components/StoryCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, Button, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { format } from 'date-fns';

export default function StoriesPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  // We'll manage the stories and loading state here instead of relying solely on useFirestore for category filtering
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true); // Start in a loading state
  const [error, setError] = useState(null); // State for potential errors

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all'); // 'all' to represent no category filter

  // --- useEffect to Fetch Data based on Category ---
  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true); // Start loading when category or initial mount changes
      setError(null); // Clear previous errors

      try {
        // Build the base query for the 'stories' collection
        let q = query(collection(db, 'stories'));

        // Add a 'where' clause if a specific category is selected (not 'all')
        if (selectedCategory && selectedCategory !== 'all') {
          q = query(q, where('category', '==', selectedCategory));
        }

        // Execute the query to get documents
        const querySnapshot = await getDocs(q);

        // Process the results
        const fetchedStories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Ensure timestamp is a Date object if it comes from Firestore
          timestamp: doc.data().timestamp?.toDate ? doc.data().timestamp.toDate() : doc.data().timestamp,
        }));

        setStories(fetchedStories); // Update the stories state

      } catch (err) {
        console.error("Error fetching stories:", err);
        setError("Failed to load stories. Please try again."); // Set an error message
        setStories([]); // Clear stories on error
      } finally {
        setLoading(false); // End loading
      }
    };

    // Call the fetch function
    fetchStories();

  }, [selectedCategory]); // Dependency array: rerun this effect when selectedCategory changes

  // --- Client-side Filtering (for Search) ---
  // Get unique categories from the *currently fetched* stories
  // This list updates whenever the useEffect finishes fetching
  const categories = [...new Set(stories.map(story => story.category))].filter(Boolean);


  // Filter stories based *only* on search term now, as category is handled by the query
  const filteredStories = stories.filter(story => {
    const matchesSearch =
      searchTerm === '' ||
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (story.content && story.content.toLowerCase().includes(searchTerm.toLowerCase())); // Check if content exists

    return matchesSearch; // Only apply search filter here
  });
  // --- End Client-side Filtering ---


  return (
    <div className="container px-4 md:px-6 py-10 md:py-16 mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Stories Collection</h1>
        <p className="text-lg text-muted-foreground">
          Explore our curated collection of captivating stories across various genres and themes.
        </p>
      </div>

      <div className="mb-10 max-w-3xl mx-auto space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search stories by title, author, or content..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Label htmlFor="category-filter" className="whitespace-nowrap">Filter by:</Label>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger id="category-filter" className="flex-1">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {/* Add 'All Categories' option */}
              <SelectItem value="all">All Categories</SelectItem>
              {/* Map over unique categories from fetched data */}
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid" className="mb-6">
        <div className="flex justify-center mb-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Display loading, error, empty state, or stories */}
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-12 px-4 text-red-500">
              <p>{error}</p>
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="col-span-full text-center py-12 px-4">
              <h3 className="text-xl font-medium">No stories found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filter options.
              </p>
            </div>
          ) : (
            filteredStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))
          )}
        </TabsContent>

        <TabsContent value="list">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-12 px-4 text-red-500">
              <p>{error}</p>
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="text-center py-12 px-4">
              <h3 className="text-xl font-medium">No stories found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filter options.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStories.map(story => (
                <Card key={story.id}>
                  <CardContent className="p-6">
                    <div className="md:flex md:items-start md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          <Link href={`/story/${story.id}`}>{story.title}</Link>
                        </h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          By {story.author || 'Anonymous'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Category: {story.category ? story.category.charAt(0).toUpperCase() + story.category.slice(1) : 'Uncategorized'}
                        </p>
                        {story.timestamp && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Published on {format(story.timestamp, 'MMM d, yyyy')}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {story.content}
                        </p>
                      </div>
                      <Link href={`/story/${story.id}`}>
                        <Button variant="outline" size="sm" className="mt-2 md:mt-0">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}