'use client';

import { Post, User } from '@prisma/client';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

import { formatTimeToNow } from '@/lib/utils';

interface PostProps {
  post: Post & {
    author: User;
  };
}

const PostCard = ({ post }: PostProps) => {
  return (
    <div className="rounded-md bg-white  border-2 border-input shadow">
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            <span>Posted by {post.author.fullName}</span>{' '}
            {formatTimeToNow(post.createdAt as Date)}
          </div>
          <a href={`/forum/${post.id}`}>
            <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
              {post.title}
            </h1>
          </a>

          <div className="relative text-sm max-h-40 w-full overflow-clip">
            <div> {post.content}</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 z-20 text-sm px-4 py-4 sm:px-6">
        <Link
          href={`/forum/${post.id}`}
          className="w-fit flex items-center gap-2"
        >
          comments
        </Link>
      </div>
    </div>
  );
};
export default PostCard;
