import { PrismaService } from '../prisma.service';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        title: string;
        content?: string;
        excerpt?: string;
        published?: boolean;
        authorId: string;
    }): Promise<{
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
    update(id: string, data: any): Promise<{
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
    like(postId: string, userId: string): Promise<{
        message: string;
    }>;
    addComment(postId: string, authorId: string, content: string, parentId?: string): Promise<any>;
}
