'use client';

import { Comment } from '@prisma/client';
import { useCallback, useState, useEffect } from 'react';

import { createComment } from '@/app/actions/comment';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CreateCommentProps {
  postId: string;
  input: string;
  setInput: any;
  handleClick: any;
}

const CreateComment = ({
  postId,
  input,
  setInput,
  handleClick,
}: CreateCommentProps) => {
  return (
    <div className="grid w-full   border-2 border-input shadow border-zinc-100 bg-zinc-100  rounded-md gap-1.5 p-2">
      <Label htmlFor="comment">Your comment</Label>
      <div className="mt-2">
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="What are your thoughts?"
        />

        <div className="mt-2 flex justify-end">
          <Button onClick={() => handleClick()}>Post</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
