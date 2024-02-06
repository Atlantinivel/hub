"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "@/components/ui/use-toast";
import departments from "@/static-data/departments.json";
import jobs from "@/static-data/jobs.json";

const items = [
  {
    id: "1",
    label: "Calendário",
  },
  {
    id: "2",
    label: "Funcionários",
  },
] as const;

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Este campo é obrigatório",
  }),
  fullName: z.string().min(2, {
    message: "Este campo é obrigatório",
  }),
  email: z
    .string({
      required_error: "Este campo é obrigatório",
    })
    .email(),
  employeeNumber: z.string({
    required_error: "Este campo é obrigatório",
  }),
  personalPhoneNumber: z.string({
    required_error: "Este campo é obrigatório",
  }),
  companyPhoneNumber: z.string({
    required_error: "Este campo é obrigatório",
  }),
  companyCode: z.string({
    required_error: "Este campo é obrigatório",
  }),
  gender: z.string({
    required_error: "Este campo é obrigatório",
  }),
  department: z.string(),
  job: z.string(),
  // role: z
  //   .string({
  //     required_error: "Este campo é obrigatório",
  //   }),
  roles: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  roles: [],
};

const UserForm = ({ id, values }: { id: string; values: any }) => {
  const isEdit = !!id;
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: id ? values : defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      if (isEdit) {
        const response = await axios.post(`/api/users/user/${id[0]}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = response.data;
        console.log(user);

        toast({
          title: "Funcionário atualizado.",
        });
        revalidatePath(`api/users/user/${id[0]}`);
      } else {
        const response = await axios.post("/api/register", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = response.data;

        console.log(user);
        toast({
          title: "Funcionário criado.",
        });
        revalidatePath(`api/users/user/${id[0]}`);
      }
    } catch (error) {
      toast({
        title: "Algo correu mal.",
      });
    }

    toast({
      title: "Funcionário atualizado",
    });
  };

  return (
    <Form {...form}>
      <div className="container py-3">
        <h1 className="mb-6 text-3xl font-bold">
          {isEdit ? "Editar funcionário" : "Adicionar funcionário"}
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Nome</FormLabel>
                <FormDescription>Nome na plataforma</FormDescription>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Nome completo</FormLabel>

                <FormControl>
                  <Input placeholder="Nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Email</FormLabel>

                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Email</FormLabel>

                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Gênero</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o gênero" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Numero de funcionário
                </FormLabel>
                <FormControl>
                  <Input placeholder="Numero de funcionário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="personalPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Numero de telemovel pessoal
                </FormLabel>
                <FormControl>
                  <Input placeholder="Numero de telemovel pessoal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="companyPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  Numero de telemovel empresa
                </FormLabel>
                <FormControl>
                  <Input placeholder="Numero de telemovel pessoal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Codigo de obra</FormLabel>
                <FormControl>
                  <Input placeholder="Codigo de obra" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Departamento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o departamento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d.value} value={d.id.toString()}>
                        {d.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="job"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Função</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a função" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {jobs.map((d) => (
                      <SelectItem key={d.value} value={d.id.toString()}>
                        {d.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Permissões</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de permissões" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((d) =>
                      <SelectItem key={d.value} value={d.id.toString()}>{d.value}</SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="roles"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Sidebar</FormLabel>
                  <FormDescription>Plataformas que tem acesso</FormDescription>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="roles"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
          {/* <div>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      URLs
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add links to your website, blog, or social media profiles.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
            >
              Add URL
            </Button>
          </div> */}
          {/* <FormField
            control={form.control}
            name="nextMedicalAppointment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Consulta de trabalho</FormLabel>
                <FormControl>
                  <DateTimePicker date={field.value || new Date()} setDate={field.onChange}></DateTimePicker>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> 
          <FormField
            control={form.control}
            name="contractStartDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-base">Consulta de trabalho</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecionar data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <div></div>
          <Button type="submit">Update profile</Button>
        </form>
      </div>
    </Form>
  );
};

export default UserForm;
