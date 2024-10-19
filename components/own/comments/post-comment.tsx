'use client';

import { Comment, User } from '@prisma/client';

import { useEffect } from 'react';

import { formatTimeToNow } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PostCommentProps {
  comment: Comment & {
    author: User;
  };
  postId: string;
}

const PostComment = ({ comment, postId }: PostCommentProps) => {
  // const { mutate: postComment, isLoading } = useMutation({
  //   mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
  //     const payload: CommentRequest = { postId, text, replyToId };

  //     const { data } = await axios.patch(
  //       `/api/subreddit/post/comment/`,
  //       payload,
  //     );
  //     return data;
  //   },
  // });
  useEffect(() => {}, [comment]);
  return (
    <>
      {comment ? (
        <>
          <Card>
            <CardHeader className="py-3">
              <div className="flex flex-row gap-3 max-h-40 mt-1 text-xs text-gray-500">
                <div>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex flex-col align-middle pt-1">
                  <span className="text-sm font-bold">
                    {comment.author.fullName}
                  </span>{' '}
                  Posted at {formatTimeToNow(comment.createdAt as Date)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{comment.text}</CardDescription>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="flex flex-col">No Comment</div>
      )}
    </>
  );
};

export default PostComment;
