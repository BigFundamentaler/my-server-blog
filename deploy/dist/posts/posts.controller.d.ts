import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: any): Promise<{
        id: string;
        title: string;
        slug: string;
        content: string | null;
        excerpt: string | null;
        coverImage: string | null;
        published: boolean;
        publishedAt: Date | null;
        viewCount: number;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
    }>;
    findAll(): Promise<{
        id: string;
        title: string;
        slug: string;
        content: string | null;
        excerpt: string | null;
        coverImage: string | null;
        published: boolean;
        publishedAt: Date | null;
        viewCount: number;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
    }[]>;
    findPublished(): Promise<{
        id: string;
        title: string;
        slug: string;
        content: string | null;
        excerpt: string | null;
        coverImage: string | null;
        published: boolean;
        publishedAt: Date | null;
        viewCount: number;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        slug: string;
        content: string | null;
        excerpt: string | null;
        coverImage: string | null;
        published: boolean;
        publishedAt: Date | null;
        viewCount: number;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
    }>;
    update(id: string, updatePostDto: any): Promise<{
        id: string;
        title: string;
        slug: string;
        content: string | null;
        excerpt: string | null;
        coverImage: string | null;
        published: boolean;
        publishedAt: Date | null;
        viewCount: number;
        createdAt: Date;
        updatedAt: Date;
        authorId: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
    like(postId: string, body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
    addComment(postId: string, body: {
        authorId: string;
        content: string;
        parentId?: string;
    }): Promise<any>;
}
