"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import departments from "@/static-data/departments.json";
import jobs from "@/static-data/jobs.json";

export type User = {
  id: String;
  name?: String;
  fullName?: String;
  birthDate?: Date;
  gender?: String;
  hashedPassword?: String;
  email?: String;
  image?: String;
  roles?: string[];
  job?: String;
  department?: String;
  employeeNumber?: String;
  personalPhoneNumber?: String;
  companyPhoneNumber?: String;
  companyCode?: String;
  nextMedicalAppointment?: Date;
  nextMedicalAppointmentLocal?: String;
  contractType?: String;
  contractStartDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

// const date = new Date(row.getValue('department'))
// const formatted = date.toLocaleDateString()

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "employeeNumber",
    header: "Numero",
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.getValue("employeeNumber")}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "department",
    header: "Departamento",
    cell: ({ row }) => {
      const item = departments.find(
        (el) => el.id == row.getValue("department"),
      );

      return <div className="font-medium">{item?.value}</div>;
    },
  },
  {
    accessorKey: "job",
    header: "Função",
    cell: ({ row }) => {
      const item = jobs.find((el) => el.id == row.getValue("job"));

      return <div className="font-medium">{item?.value}</div>;
    },
  },

  {
    accessorKey: "companyCode",
    header: "Obra",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("companyCode")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            {/* <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(user.id)}
                        >
                            {user.id}
                        </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <Link href={`/hub/users/user/${user.id}`}>
              <DropdownMenuItem>Ver/editar</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
