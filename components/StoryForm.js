"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, Upload } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';
import { useStorage } from '@/hooks/useStorage';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  category: z.string().min(1, { message: 'Please select a category' }),
  author: z.string().min(2, { message: 'Author must be at least 2 characters' }),
  featured: z.boolean().optional().default(false),
});

export default function StoryForm({ initialData = null, onSubmit, isSubmitting = false }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const { uploadFile, progress } = useStorage();
  const isEditing = !!initialData;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || '',
      category: initialData?.category || '',
      author: initialData?.author || '',
      featured: initialData?.featured || false,
    },
  });

  useEffect(() => {
    if (initialData) {
      setContent(initialData.content || '');
      setImagePreview(initialData.imageUrl || '');
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      let imageUrl = initialData?.imageUrl || '';
      let imagePath = initialData?.imagePath || '';

      if (image) {
        const result = await uploadFile(image, 'stories');
        if (result) {
          imageUrl = result.url;
          imagePath = result.path;
        }
      }

      await onSubmit({
        ...data,
        content,
        imageUrl,
        imagePath
      });

      // Reset form if not editing
      if (!isEditing) {
        form.reset();
        setContent('');
        setImage(null);
        setImagePreview('');
      }
      
      toast.success(isEditing ? 'Story updated successfully' : 'Story created successfully');
    } catch (error) {
      console.error('Error submitting story:', error);
      toast.error('An error occurred while saving the story');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Story' : 'Create New Story'}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter story title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fiction">Fiction</SelectItem>
                      <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="adventure">Adventure</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="sci-fi">Science Fiction</SelectItem>
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Content</FormLabel>
              <RichTextEditor value={content} onChange={setContent} />
              {!content && <p className="text-sm text-destructive">Content is required</p>}
              
            </div>

            <div className="space-y-2">
              <FormLabel>Cover Image</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-center border-2 border-dashed rounded-md h-40 relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center">
                      <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  </div>
                  {progress > 0 && progress < 100 && (
                    <div className="mt-2">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 text-right">
                        {Math.round(progress)}%
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  {imagePreview ? (
                    <div className="h-40 rounded-md overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-40 rounded-md bg-muted flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">No image selected</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <CardFooter className="px-0 flex justify-end space-x-2">
              <Button
                type="submit"
                disabled={isSubmitting || !content}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : isEditing ? (
                  'Update Story'
                ) : (
                  'Create Story'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}