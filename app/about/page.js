import React from 'react';
import { BookOpen, Users, Sparkles, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    
    <div className="container px-4 md:px-6 py-10 md:py-16 mx-auto">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About StoryVerse</h1>
        <p className="text-xl text-muted-foreground">
          Immerse yourself in our world of captivating stories and creative expression.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            StoryVerse was founded in 2023 with a simple mission: to create a platform where stories of all kinds could be shared, discovered, and celebrated.
          </p>
          <p className="text-muted-foreground mb-4">
            We believe that stories have the power to inspire, educate, and transform. They connect us across cultures, generations, and experiences, allowing us to see the world through different eyes.
          </p>
          <p className="text-muted-foreground">
            What started as a small community of passionate storytellers has grown into a vibrant platform featuring diverse voices from around the world.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="https://images.pexels.com/photos/3767411/pexels-photo-3767411.jpeg"
            alt="Team collaborating"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Values */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The core principles that guide everything we do at StoryVerse.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <BookOpen className="h-12 w-12" />,
              title: "Creativity",
              description: "We celebrate imaginative expression and unique perspectives in storytelling."
            },
            {
              icon: <Users className="h-12 w-12" />,
              title: "Community",
              description: "We foster connection and collaboration among storytellers and readers."
            },
            {
              icon: <Sparkles className="h-12 w-12" />,
              title: "Quality",
              description: "We are committed to featuring well-crafted, engaging content."
            },
            {
              icon: <Award className="h-12 w-12" />,
              title: "Inclusivity",
              description: "We welcome diverse voices and stories from all backgrounds."
            }
          ].map((value, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="bg-primary/10 text-primary mx-auto rounded-full w-20 h-20 flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the passionate individuals behind StoryVerse.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Emma Johnson",
              role: "Founder & CEO",
              image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
            },
            {
              name: "Michael Chen",
              role: "Creative Director",
              image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
            },
            {
              name: "Sophia Patel",
              role: "Senior Editor",
              image: "https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg"
            },
            {
              name: "James Wilson",
              role: "Community Manager",
              image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 overflow-hidden rounded-full w-32 h-32 mx-auto">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Story</h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6">
          Become part of our community and start sharing your stories with readers around the world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/stories">
            <Button size="lg" className="bg-background text-primary hover:bg-background/90">
              Explore Stories
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}