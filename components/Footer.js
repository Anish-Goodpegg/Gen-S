import React from 'react';
import Link from 'next/link';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-primary-foreground mt-auto pt-12 pb-6">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6" />
              <span className="font-bold text-xl">StoryVerse</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Sharing captivating stories that inspire, entertain, and connect readers across the world.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" className="hover:text-primary-foreground/80 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="hover:text-primary-foreground/80 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="hover:text-primary-foreground/80 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/stories" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/stories?category=fiction" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Fiction
                </Link>
              </li>
              <li>
                <Link href="/stories?category=non-fiction" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Non-Fiction
                </Link>
              </li>
              <li>
                <Link href="/stories?category=mystery" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Mystery
                </Link>
              </li>
              <li>
                <Link href="/stories?category=adventure" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Adventure
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-primary-foreground/80">123 Story Lane, Reading City, RC 12345</span>
              </li>
              <li className="flex">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-primary-foreground/80">+1 (123) 456-7890</span>
              </li>
              <li className="flex">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <span className="text-primary-foreground/80">info@storyverse.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-primary-foreground/60 text-sm">
          <p>&copy; {currentYear} StoryVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}