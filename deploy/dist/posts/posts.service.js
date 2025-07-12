"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const slug = data.title.toLowerCase().replace(/\s+/g, '-');
        return this.prisma.posts.create({
            data: {
                ...data,
                slug,
                publishedAt: data.published ? new Date() : null,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.posts.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findPublished() {
        return this.prisma.posts.findMany({
            where: { published: true },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true,
                    },
                },
            },
            orderBy: {
                publishedAt: 'desc',
            },
        });
    }
    async findOne(id) {
        const post = await this.prisma.posts.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                    },
                },
                comments: {
                    where: { parentId: null },
                    include: {
                        author: {
                            select: {
                                id: true,
                                username: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                        replies: {
                            include: {
                                author: {
                                    select: {
                                        id: true,
                                        username: true,
                                        firstName: true,
                                        lastName: true,
                                    },
                                },
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true,
                    },
                },
            },
        });
        if (!post) {
            throw new common_1.NotFoundException('文章不存在');
        }
        await this.prisma.posts.update({
            where: { id },
            data: { viewCount: { increment: 1 } },
        });
        return post;
    }
    async update(id, data) {
        return this.prisma.posts.update({
            where: { id },
            data,
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }
    async remove(id) {
        await this.prisma.posts.delete({
            where: { id },
        });
        return { message: '文章删除成功' };
    }
    async like(postId, userId) {
        const existing = await this.prisma.like.findUnique({
            where: {
                userId_postId: { userId, postId },
            },
        });
        if (existing) {
            await this.prisma.like.delete({
                where: { userId_postId: { userId, postId } },
            });
            return { message: '取消点赞' };
        }
        else {
            await this.prisma.like.create({
                data: { userId, postId },
            });
            return { message: '点赞成功' };
        }
    }
    async addComment(postId, authorId, content, parentId) {
        return this.prisma.comment.create({
            data: {
                content,
                postId,
                authorId,
                parentId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map