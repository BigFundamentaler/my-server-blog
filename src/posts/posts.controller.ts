import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 创建文章
  @Post()
  create(@Body() createPostDto: any) {
    return this.postsService.create(createPostDto);
  }

  // 获取所有文章
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  // 获取已发布文章
  @Get('published')
  findPublished() {
    return this.postsService.findPublished();
  }

  // 获取文章详情
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  // 更新文章
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: any) {
    return this.postsService.update(id, updatePostDto);
  }

  // 删除文章
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }

  // 点赞文章
  @Post(':id/like')
  like(@Param('id') postId: string, @Body() body: { userId: string }) {
    return this.postsService.like(postId, body.userId);
  }

  // 添加评论
  @Post(':id/comments')
  addComment(
    @Param('id') postId: string,
    @Body() body: { authorId: string; content: string; parentId?: string }
  ) {
    return this.postsService.addComment(postId, body.authorId, body.content, body.parentId);
  }
}