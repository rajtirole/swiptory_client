import { z } from 'zod';

export const userSchema = z.object({
    username: z.string().min(2,{message:"Please enter valid username"}).max(100,{message:"password should contain 100 characters only"}),
    password: z.string().min(1,{message:"Please enter valid password"}).max(100,{message:"password should contain 100 characters only"}),
    
  });
  
  
  export const postSchema = z.array(
    z.object({
      heading: z.string().min(1,{message:"Please enter valid heading"}).max(1000,{message:"heading should contain 1000 characters only"}),
      description: z.string().min(1,{message:"Please enter valid description"}),
      image: z.string().min(1,{message:"Please enter valid image"}),
      category: z.string().min(1,{message:"Please enter valid category"})
    })
  ).refine((posts) => {
    // Check if all categories are the same
    const firstCategory = posts[0]?.category; // Get the category of the first post
  
    return posts.every(post => post.category === firstCategory);
  }, {
    message: 'All posts must have the same category', // Custom error message
  });