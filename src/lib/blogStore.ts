
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Comment {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  likedBy: string[]; // Store IP or browser fingerprint
  comments: Comment[];
}

interface BlogState {
  blogs: Blog[];
  addBlog: (blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likedBy' | 'comments'>) => string;
  updateBlog: (id: string, blog: Partial<Omit<Blog, 'id' | 'createdAt' | 'updatedAt' | 'likes' | 'likedBy' | 'comments'>>) => void;
  deleteBlog: (id: string) => void;
  getBlog: (id: string) => Blog | undefined;
  likeBlog: (id: string, userId: string) => boolean; // Returns true if liked, false if unliked
  addComment: (blogId: string, name: string, message: string) => void;
}

// Generate a browser fingerprint for like tracking
const generateUserId = () => {
  const stored = localStorage.getItem('visitor-id');
  if (stored) return stored;
  
  const newId = uuidv4();
  localStorage.setItem('visitor-id', newId);
  return newId;
};

// Helper to ensure we have a user ID for tracking likes
export const getUserId = () => {
  return generateUserId();
};

export const useBlogStore = create<BlogState>()(
  persist(
    (set, get) => ({
      blogs: [],
      
      addBlog: (blog) => {
        const id = uuidv4();
        const now = new Date().toISOString();
        
        set((state) => ({
          blogs: [
            {
              ...blog,
              id,
              createdAt: now,
              updatedAt: now,
              likes: 0,
              likedBy: [],
              comments: []
            },
            ...state.blogs,
          ],
        }));
        
        return id;
      },
      
      updateBlog: (id, updatedBlog) => {
        set((state) => ({
          blogs: state.blogs.map((blog) =>
            blog.id === id
              ? {
                  ...blog,
                  ...updatedBlog,
                  updatedAt: new Date().toISOString(),
                }
              : blog
          ),
        }));
      },
      
      deleteBlog: (id) => {
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog.id !== id),
        }));
      },
      
      getBlog: (id) => {
        return get().blogs.find((blog) => blog.id === id);
      },
      
      likeBlog: (id, userId) => {
        let liked = false;
        
        set((state) => {
          const blogs = state.blogs.map((blog) => {
            if (blog.id === id) {
              const hasLiked = blog.likedBy.includes(userId);
              
              if (hasLiked) {
                // User already liked, so unlike
                return {
                  ...blog,
                  likes: Math.max(0, blog.likes - 1),
                  likedBy: blog.likedBy.filter(id => id !== userId)
                };
              } else {
                // User hasn't liked, so add like
                liked = true;
                return {
                  ...blog,
                  likes: blog.likes + 1,
                  likedBy: [...blog.likedBy, userId]
                };
              }
            }
            return blog;
          });
          
          return { blogs };
        });
        
        return liked;
      },
      
      addComment: (blogId, name, message) => {
        set((state) => {
          const blogs = state.blogs.map((blog) => {
            if (blog.id === blogId) {
              return {
                ...blog,
                comments: [
                  ...blog.comments,
                  {
                    id: uuidv4(),
                    name,
                    message,
                    createdAt: new Date().toISOString()
                  }
                ]
              };
            }
            return blog;
          });
          
          return { blogs };
        });
      }
    }),
    {
      name: 'blog-storage'
    }
  )
);
