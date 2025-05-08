"use client";

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useFirestore } from '@/hooks/useFirestore';
import { BookOpen, Users, Eye, FileText, Plus, BookText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboardContent() {
  const { user } = useAuth();
  const { documents: stories, loading } = useFirestore('stories');
  const router = useRouter();

  // Basic analytics calculation
  const totalStories = stories.length;
  const totalViews = 1024; // Placeholder for demonstration
  const totalCategories = [...new Set(stories.map(story => story.category))].filter(Boolean).length;
  const recentStories = stories.slice(0, 5); // Get the 5 most recent stories

  return (
    <ProtectedRoute>
      <div className="container px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.email || 'Admin'}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => router.push('/admin/stories/new')}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Story
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStories}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalStories > 0 ? '+1 from last week' : 'No stories yet'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCategories}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalCategories > 0 ? 'Across all stories' : 'No categories yet'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">421</div>
              <p className="text-xs text-muted-foreground mt-1">
                +5% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Stories */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Stories</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/stories">
                View all
              </Link>
            </Button>
          </div>
          <div className="rounded-md border">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-muted">
                  <tr>
                    <th scope="col" className="px-6 py-3">Title</th>
                    <th scope="col" className="px-6 py-3">Category</th>
                    <th scope="col" className="px-6 py-3">Author</th>
                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-6 text-center">
                        Loading recent stories...
                      </td>
                    </tr>
                  ) : recentStories.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-6 text-center">
                        <div className="flex flex-col items-center justify-center py-8">
                          <BookText className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-muted-foreground mb-2">No stories found</p>
                          <Button
                            variant="outline"
                            onClick={() => router.push('/admin/stories/new')}
                          >
                            Create your first story
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    recentStories.map((story) => (
                      <tr key={story.id} className="border-b hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium">{story.title}</td>
                        {/* <td className="px-6 py-4 capitalize">{story.category || 'Uncategorized'}</td>
                        <td className="px-6 py-4">{story.author || 'Admin'}</td> */}
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/stories/edit/${story.id}`}>
                              Edit
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/story/${story.id}`}>
                              View
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Manage Stories</CardTitle>
              <CardDescription>
                Create, edit, and organize your stories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/stories">Go to Stories</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Preview Website</CardTitle>
              <CardDescription>
                See how your stories look on the frontend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">View Website</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Create New Story</CardTitle>
              <CardDescription>
                Start writing a new story right away
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/stories/new">Create Story</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}