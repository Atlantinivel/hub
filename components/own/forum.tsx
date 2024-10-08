'use client';
import { Post, User } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';

import { createPost, getPosts } from '@/app/actions/forum';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import departments from '@/static-data/departments.json';
import jobs from '@/static-data/jobs.json';

import PostCard from './post-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
type PostTypo = Post & {
  author: User;
};
// interface PostProps {
//   post: PostTypo;
// }

export function Forum() {
  const [job, setJob] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [filtering, setFiltering] = useState('');
  const [posts, setPosts] = useState<Post[]>();
  const [post, setPost] = useState<Post>();
  const getPostsServerAction = async () => {
    const posts = await getPosts();
    setPosts(posts.data);
  };

  useEffect(() => {
    getPostsServerAction();
  }, [post]);
  const handleCreatePost = useCallback(async () => {
    const request = await createPost({
      departmentid: department,
      title: title,
      content: content,
      userId: '65bd343d627409b6f55d4b1e',
    });
    setPost(request.data);
  }, [content, department, title]);
  return (
    <>
      {/* Filters and add post */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 py-4">
          <Input
            placeholder="Nome..."
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="max-w-sm"
          />
          <Select
            onValueChange={(o) => {
              setDepartment(o);
            }}
            value={department || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d.value} value={d.id.toString()}>
                  {d.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(o) => {
              setJob(o);
            }}
            value={job || ''}
          >
            <SelectTrigger>
              <SelectValue placeholder="Função" />
            </SelectTrigger>
            <SelectContent>
              {jobs.map((d) => (
                <SelectItem key={d.value} value={d.id.toString()}>
                  {d.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              setDepartment('');
              setJob('');
              setFiltering('');
            }}
            variant="outline"
            className="ml-auto"
          >
            Limpar
          </Button>
        </div>
        {/* Modal add post */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Adicionar Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Adicionar</DialogTitle>
              <DialogDescription>Adicione um novo post</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Select
                onValueChange={(o) => {
                  setDepartment(o);
                }}
                value={department || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d.value} value={d.id.toString()}>
                      {d.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label htmlFor="name" className="text-left">
                Título
              </Label>
              <Input
                id="name"
                placeholder="Escreva um título para o seu post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="max-w-sm"
              />
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escreva a mesnagem do post"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={handleCreatePost}>
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {/* display posts */}
      <div className="flex flex-col gap-3">
        {posts &&
          posts.map((it: Post, index) => (
            <PostCard key={index} post={it as PostTypo}></PostCard>
          ))}
      </div>
    </>
  );
}
