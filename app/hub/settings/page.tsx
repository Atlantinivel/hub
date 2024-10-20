// 'use client';
// import { DataTable } from '@/components/own/table';
// import { User, columns } from '@/components/own/user-table/columns';
// import { useEffect, useState } from 'react';
// import { Loader2 } from 'lucide-react';

// export default function Settings() {
//   const [data, setData] = useState(null)

//   const [isLoading, setLoading] = useState(true)

//   useEffect(() => {
//     fetch(`/api/users`)
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data)
//         setLoading(false)
//       })
//   }, [])

//   if (isLoading) return <div className='container h-full flex align-middle items-center'><Loader2 className="m-auto h-12  w-12 animate-spin"></Loader2></div>
//   if (!data) return <p>No data</p>

//   return (
//     <div className="container py-3">
//       <h1 className="mb-6 text-3xl font-bold">Funcionários</h1>
//       <DataTable columns={columns} data={data} />
//     </div>
//   );
// }
'use client';

import { useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';

const Settings = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const session = useSession();
  const { data } = session;

  if (!data) return null;
  //@ts-ignore
  const { token } = data;
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];

    const imageURL = URL.createObjectURL(selectedFile);
    setUploadedImage(imageURL);
  };

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };
  return (
    <>
      <main>
        {/* <PageTitle>Settings</PageTitle> */}
        <Card className="m-6">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className=" h-40 w-40">
              {uploadedImage ? (
                <AvatarImage
                  src={uploadedImage}
                  className=" bg-cover object-cover"
                  alt="@shadcn"
                />
              ) : (
                <AvatarFallback>{token.name?.charAt(0)}</AvatarFallback>
              )}
            </Avatar>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            <div>
              <CardTitle> {token.name} </CardTitle>
              <CardDescription>{token.id}</CardDescription>
              <Button className="mt-4" onClick={handleUploadImage}>
                Inserir foto
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Nome</p>
                <p className="text-sm text-muted-foreground">
                  <b>{token.name}</b>
                </p>
              </div>
            </div>
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Email</p>
                <p className="text-sm text-muted-foreground">
                  <b>{token.email}</b>
                </p>
              </div>
            </div>
            <div className=" flex items-center space-x-4 rounded-md border p-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Numero</p>
                <p className="text-sm text-muted-foreground">
                  <b>{token.employeeNumber}</b>
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="gap-4">
            <Button>Recuperar password</Button>
            <Button onClick={() => signOut()}>Log out</Button>
          </CardFooter>
        </Card>
      </main>
    </>
  );
};

export default Settings;
