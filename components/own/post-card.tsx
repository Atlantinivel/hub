'use client';

import { Post, User } from '@prisma/client';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

import { formatTimeToNow } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import departments from '@/static-data/departments.json';
type PostTypo = Post & {
  author: User;
};
interface PostProps {
  post: PostTypo;
}

const PostCard = ({ post }: PostProps) => {
  return (
    <Card>
      <CardHeader className="py-3">
        <div className="flex flex-row gap-3 max-h-40 mt-1 text-xs text-gray-500">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col align-middle pt-1">
            <span className="text-sm font-bold">{post.author.fullName}</span>{' '}
            Posted at {formatTimeToNow(post.createdAt as Date)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <a href={`/hub/forum/${post.id}`}>
          <CardTitle className="py-3 text-base">{post.title}</CardTitle>
          <CardDescription>{post.content}</CardDescription>
        </a>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-row justify-between w-full gap-3 max-h-40 mt-1 text-xs text-gray-500">
          <div>
            <Badge className="bg-neutral-200" variant="outline">
              {
                departments.find(
                  (x) => x.id == Number(post.departmentid as string),
                )?.value
              }
            </Badge>
          </div>
          <div className="flex flex-col  align-middle">
            <Link
              href={`/hub/forum/${post.id}`}
              className="w-fit flex items-center gap-2 underline"
            >
              View comments
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
export default PostCard;
