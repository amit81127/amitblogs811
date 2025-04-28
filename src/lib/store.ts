
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface BlogStore {
  blogs: Blog[];
  addBlog: (blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateBlog: (id: string, blog: Partial<Blog>) => void;
  deleteBlog: (id: string) => void;
  getBlog: (id: string) => Blog | undefined;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set, get) => ({
      blogs: [],
      addBlog: (blog) => {
        const id = uuidv4();
        const now = new Date();
        set((state) => ({
          blogs: [
            {
              ...blog,
              id,
              createdAt: now,
              updatedAt: now,
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
              ? { ...blog, ...updatedBlog, updatedAt: new Date() }
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
    }),
    {
      name: 'blogs-storage',
    }
  )
);
