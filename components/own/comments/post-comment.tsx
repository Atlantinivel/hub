'use client';

import { Comment, User } from '@prisma/client';

import { useEffect } from 'react';

import { formatTimeToNow } from '@/lib/utils';

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
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="ml-2 flex items-center gap-x-2">
                <p className="text-sm font-medium text-gray-900">
                  u/{comment.author.fullName}
                </p>

                <p className="max-h-40 truncate text-xs text-zinc-500">
                  {formatTimeToNow(comment.createdAt as Date)}
                </p>
              </div>
            </div>
            <p className="text-sm text-zinc-900 mt-2">{comment.text}</p>
          </div>{' '}
        </>
      ) : (
        <div className="flex flex-col">No Comment</div>
      )}
    </>
  );
};

export default PostComment;
