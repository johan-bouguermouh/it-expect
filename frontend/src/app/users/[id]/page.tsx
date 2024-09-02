"use client";
import ReactFormMaker from "@/components/ReactFormMaker/ReactFormMaker";
import {
  FieldReactFormMaker,
  ReactFormMakerFieldset,
} from "@/components/ReactFormMaker/ReactFormMaker.interface";
import { getUserById, patchUser } from "@/services/userService";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef, FormEvent } from "react";
import { Button } from "react-day-picker";
import { z } from "zod";

function Users({ params }: { params: { id: string } }) {
  const userId = Number(params.id);
  const [zodObject, setZodObject] = useState<any>(null);
  const [isUser, setUser] = useState(false);
  const [formData, setFormData] = useState<patchUser | null>(null);
  const refForm = useRef(null);

  useEffect(() => {
    setUser(true); // Activer la requête après le montage du composant
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event.target);
  }

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUserById(userId),
    enabled: isUser,
  });

  const userFormConfig: ReactFormMakerFieldset[] = [
    {
      fieldset: "User Information",
      legend: "Change user information",
      className: "p-4 rounded-lg shadow-lg w-[600px]",
      fields: [
        {
          inputName: "FistName",
          defaultValues: user?.firstName,
          label: "First Name",
          className: "form-input",
          placeholder: "Your First Name",
          inputType: "text",
          zodObject: z.string().min(2, {
            message: "First Name must be at least 2 characters.",
          }),
        },
        {
          inputName: "LastName",
          label: "Last Name",
          defaultValues: user?.lastName,
          className: "form-input",
          placeholder: "Your Last Name",
          inputType: "text",
          zodObject: z.string().min(2, {
            message: "Last Name must be at least 2 characters.",
          }),
        },
        {
          inputName: "Email",
          label: "Email",
          defaultValues: user?.email,
          className: "form-input",
          placeholder: "Your Email",
          inputType: "text",
          zodObject: z.string().email({
            message: "Please enter a valid email address.",
          }),
        },
      ],
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <span>Error: </span>;
  }

  return (
    <div>
      <h1>Users {params.id}</h1>
      <ReactFormMaker
        formfields={userFormConfig}
        onSubmit={onSubmit}
        setZodObject={setZodObject}
        btnTextSubmit="Update"
      />
    </div>
  );
}

export default Users;
