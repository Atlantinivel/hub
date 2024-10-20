'use client';

import { Comment } from '@prisma/client';
import { useCallback, useState, useEffect } from 'react';

import { createComment } from '@/app/actions/comment';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

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
    <Card>
      <CardHeader className="py-3">
        <CardDescription>Comentário</CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="Escreve um comentário aqui"
        />
      </CardContent>
      <CardFooter className="mt-2 flex justify-end">
        <Button onClick={() => handleClick()}>Publicar</Button>
      </CardFooter>
    </Card>
  );
};

export default CreateComment;
