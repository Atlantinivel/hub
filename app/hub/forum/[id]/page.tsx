import { Post, User, Comment } from '@prisma/client';

import PostSection from '@/components/own/post-section';
type CommentTypo = Comment & {
  author: User;
};
type ExtendedPost = Post & {
  comments: CommentTypo[];
  author: User;
};

interface PostPageProps {
  params: {
    id: string;
  };
}

const PostPage = ({ params }: PostPageProps) => {
  return (
    <div className="container py-3">
      <PostSection id={params.id}></PostSection>
    </div>
  );
};

export default PostPage;
