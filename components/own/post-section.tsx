'use client';
import { Comment, Post, User } from '@prisma/client';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { createComment } from '@/app/actions/comment';

import { getPostById } from '@/app/actions/post';

import CreateComment from './comments/create-comment';
import PostComment from './comments/post-comment';
import PostItem from './post/post';
type PostTypo = Post & {
  author: User;
};
type CommentTypo = Comment & {
  author: User;
};
type ExtendedPost = Post & {
  comments: CommentTypo[];
  author: User;
};

interface PostSectionProps {
  id: string;
}

const PostSection = ({ id }: PostSectionProps) => {
  const [input, setInput] = useState<string>('');
  const [comment, setComment] = useState<Comment>();
  const [post, setPost] = useState<ExtendedPost>();
  const { data: session } = useSession();
  useEffect(() => {
    getPostsServerAction(id);
  }, [comment]);
  const handleCreateComment = useCallback(async () => {
    console.log('test handle comment');
    const request = await createComment({
      text: input,
      postId: post?.id as string,
      //@ts-expect-error
      userId: session?.user?.id,
    });

    setComment(request.data);
    setInput('');
  }, [input, post?.id]);

  const getPostsServerAction = async (postid: string) => {
    const postdata = await getPostById(postid);
    console.log(postdata);
    setPost(postdata);
  };

  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <div className="flex flex-col gap-y-6 mt-4">
        {post && (
          <div key={post.id} className="flex flex-col">
            <div className="mb-2  rounded-md bg-white  border-2 border-input shadow p-2 ">
              <PostItem post={post as PostTypo} postId={post.id} />
            </div>
            <CreateComment
              postId={post.id}
              handleClick={handleCreateComment}
              input={input}
              setInput={setInput}
            />
            {/* Render replies */}
            {post?.comments?.map((reply: CommentTypo) => {
              return (
                <div
                  key={reply.id}
                  className="m-2 py-2 pl-4 border-l-2 border-y-2 border-zinc-200"
                >
                  <PostComment comment={reply} postId={post.id} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostSection;
