'use client';

import { Post, User } from '@prisma/client';

import { formatTimeToNow } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import departments from '@/static-data/departments.json';

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
                  {post.author.fullName}
                </span>{' '}
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
              <div className="flex flex-col  align-middle"></div>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostItem;
