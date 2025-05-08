import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, BookText, BookOpenCheck, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background to-muted py-20 md:py-28">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-primary/10 p-3 rounded-full mb-2">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Welcome to <span className="text-primary">StoryVerse</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
              Discover captivating stories that inspire, entertain, and connect readers across the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button asChild size="lg">
                <Link href="/stories">
                  Browse Stories
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Fiction', icon: <BookText className="h-10 w-10" />, href: '/stories?category=fiction', color: 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300' },
              { title: 'Mystery', icon: <BookOpenCheck className="h-10 w-10" />, href: '/stories?category=mystery', color: 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-300' },
              { title: 'Adventure', icon: <BookOpen className="h-10 w-10" />, href: '/stories?category=adventure', color: 'bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-300' },
              { title: 'Romance', icon: <BookText className="h-10 w-10" />, href: '/stories?category=romance', color: 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300' },
            ].map((category, index) => (
              <Link 
                key={index} 
                href={category.href}
                className="flex flex-col items-center justify-center p-6 rounded-lg hover:shadow-md transition-all duration-300 hover:-translate-y-1 border"
              >
                <div className={`${category.color} p-4 rounded-full mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-medium">{category.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories (would be dynamically populated) */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Stories
            </h2>
            <Link 
              href="/stories" 
              className="flex items-center text-primary hover:underline mt-4 md:mt-0"
            >
              View all stories
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Forgotten Path",
                excerpt: "A journey through the mysterious forest leads to unexpected discoveries and ancient secrets.",
                image: "https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg",
                author: "Alex Morgan",
                category: "Adventure"
              },
              {
                title: "Whispers in the Dark",
                excerpt: "When strange occurrences begin happening in the old mansion, Sarah must uncover the truth before it's too late.",
                image: "https://images.pexels.com/photos/3965228/pexels-photo-3965228.jpeg",
                author: "Eliza Collins",
                category: "Mystery"
              },
              {
                title: "Beyond the Stars",
                excerpt: "The first interstellar mission to Alpha Centauri reveals more than humanity ever bargained for.",
                image: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg",
                author: "James Wilson",
                category: "Science Fiction"
              }
            ].map((story, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg border shadow-sm">
                <div className="overflow-hidden h-48">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="space-y-1 mb-3">
                    <h3 className="text-xl font-semibold transition-colors group-hover:text-primary">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      By {story.author} · {story.category}
                    </p>
                  </div>
                  <p className="text-muted-foreground mb-4">{story.excerpt}</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Read Story
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Join our community of storytellers
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-[700px] mx-auto">
              Connect with other readers, get personalized recommendations, and never miss a new story.
            </p>
            <Button size="lg" className="mt-6 bg-background text-primary hover:bg-background/90">
              Get Started
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}