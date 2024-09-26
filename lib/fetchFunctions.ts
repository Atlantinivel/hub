import type { GenericObject } from '@/models/types';

const baseUrl = process.env.NEXTAUTH_URL;

export const getData = async (url: string) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'GET',
  });

  const data = await res.json();
  return data;
};

export const postData = async (url: string, post: GenericObject) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const putData = async (url: string, post: GenericObject) => {
  const res = await fetch(`/api/${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const deleteData = async (url: string, post: GenericObject) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};
