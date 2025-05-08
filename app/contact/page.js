"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, MessageSquare, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Your message has been sent!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <div className="container px-4 md:px-6 py-10 md:py-16 mx-auto">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground">
          Have a question or feedback? We did love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="col-span-1 space-y-4">
          <Card>
            <CardContent className="flex items-start space-x-4 p-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-muted-foreground">info@storyverse.com</p>
                <p className="text-muted-foreground">support@storyverse.com</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-start space-x-4 p-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Phone</h3>
                <p className="text-muted-foreground">+1 (123) 456-7890</p>
                <p className="text-muted-foreground">+1 (987) 654-3210</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-start space-x-4 p-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Address</h3>
                <p className="text-muted-foreground">
                  123 Story Lane<br />
                  Reading City, RC 12345<br />
                  United States
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-start space-x-4 p-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Social Media</h3>
                <div className="space-y-1">
                  <a href="#" className="text-muted-foreground hover:text-primary block">
                    Twitter: @StoryVerse
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary block">
                    Instagram: @StoryVerse_Official
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary block">
                    Facebook: StoryVerse
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Subject of your message"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <div className="aspect-video rounded-xl overflow-hidden border shadow-sm">
          <img
            src="https://images.pexels.com/photos/2765871/pexels-photo-2765871.jpeg"
            alt="Map location"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              question: "How can I submit my own story?",
              answer: "Currently, our platform is curated by our editorial team. However, we're working on a submission feature. Contact us if you'd like to be considered as a contributor."
            },
            {
              question: "Do you offer printing services for stories?",
              answer: "We don't currently offer printing services, but we're exploring partnerships with publishers for select stories in the future."
            },
            {
              question: "Can I translate stories to other languages?",
              answer: "We're working on multi-language support. If you're interested in helping with translations, please contact our team."
            },
            {
              question: "How often is new content added?",
              answer: "We publish new stories weekly, typically on Mondays and Thursdays. Subscribe to our newsletter to stay updated."
            }
          ].map((item, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-medium text-lg mb-2">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}