'use client';

import { Post, User } from '@prisma/client';

import { formatTimeToNow } from '@/lib/utils';

interface PostCommentProps {
  post: Post & {
    author: User;
  };
  postId: string;
}

const PostItem = ({ post, postId }: PostCommentProps) => {
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

  return (
    <>
      {post ? (
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="ml-2 flex items-center gap-x-2">
              <p className="text-sm font-medium text-gray-900">
                u/{post?.author?.fullName}
              </p>

              <p className="max-h-40 truncate text-xs text-zinc-500">
                {formatTimeToNow(post.createdAt as Date)}
              </p>
            </div>
          </div>
          <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">
            {post.title}
          </h1>
          <p className="text-sm text-zinc-900 mt-2">{post.content}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostItem;
