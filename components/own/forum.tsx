'use client';
import { Post, User } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { createPost, getPosts } from '@/app/actions/forum';
import { sendEmail } from '@/app/actions/send';
import { config } from '@/app/api/auth/[...nextauth]/route';
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
  const [filterPosts, setFilterPosts] = useState<Post[]>();
  const [post, setPost] = useState<Post>();
  const { data: session } = useSession();
  const getPostsServerAction = async () => {
    const posts = await getPosts();

    setPosts(posts.data);
    setFilterPosts(posts.data);
  };
  console.log(session);
  useEffect(() => {
    getPostsServerAction();
  }, [post]);
  const handleCreatePost = useCallback(async () => {
    const request = await createPost({
      departmentid: department,
      title: title,
      content: content,
      //@ts-expect-error
      userId: session?.user?.id,
    });
    setPost(request.data);
    sendEmail(department as string, request.data.id as string);
  }, [content, department, title]);

  const handleDepartmentChange = useCallback(
    (o: any) => {
      console.log(o);
      const newPostList = posts?.filter((item) => item.departmentid == o);
      setFilterPosts(newPostList);
      setDepartment(o);
    },
    [department, filterPosts],
  );
  const handleClean = useCallback(
    (o: any) => {
      setFilterPosts(posts);
      setDepartment('');
      setJob('');
      setFiltering('');
    },
    [filterPosts],
  );
  return (
    <>
      {/* Filters and add post */}
      <div className="flex sm:flex-row flex-col  sm:items-center items-start justify-between ">
        <div className="flex sm:flex-row flex-col  sm:items-center items-start gap-2 py-4">
          <Input
            placeholder="Nome..."
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            className="max-w-sm"
          />
          <Select
            onValueChange={(o) => {
              handleDepartmentChange(o);
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
            onClick={(o) => {
              handleClean(o);
            }}
            variant="outline"
            className="sm:ml-auto"
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
      <div className="flex flex-col gap-3 pt-5">
        {filterPosts &&
          filterPosts.map((it: Post, index) => (
            <PostCard key={index} post={it as PostTypo}></PostCard>
          ))}
      </div>
    </>
  );
}
