import { Post, User, Comment } from '@prisma/client';

import PostSection from '@/components/own/post-section';
import { SlashIcon } from '@radix-ui/react-icons';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

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
      <Breadcrumb className="py-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/hub">Hub</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/hub/forum">Forum</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Comment</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PostSection id={params.id}></PostSection>
    </div>
  );
};

export default PostPage;
