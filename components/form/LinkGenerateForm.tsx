"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { saveNewLink } from "@/actions/link-actions";
import { useToast } from "../ui/use-toast";
import LinkGenerateSuccessModal from "../modal/LinkGenerateSuccessModal";

const schema = z.object({
  link: z
    .string({
      required_error: "Required!",
    })
    .url("Invalid URL."),
});

type FormType = z.infer<typeof schema>;

type ModalState = {
  actualLink?: string;
  shortLink?: string;
  show: boolean;
};

export default function LinkGenerateForm() {
  const form = useForm<FormType>({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      link: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState<ModalState>({
    show: false,
  });
  const { toast } = useToast();

  const onSubmit = form.handleSubmit(async (formData) => {
    try {
      const trimedLink = formData.link.trim();
      setIsLoading(true);
      const result = await saveNewLink(trimedLink);
      if (!result) {
        return toast({
          title: "Error",
          description: "Failed to generate, Please try again later!",
          variant: "destructive",
        });
      }
      setModalState({
        show: true,
        actualLink: result?.actualLink,
        shortLink: window.location.href + result.shortLink,
      });
    } catch (_e) {
      toast({
        title: "Error",
        description: "Failed to generate, Please try again later!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      form.resetField("link");
    }
  });

  return (
    <>
      <Form {...form}>
        <div className="mt-5">
          <div className="flex items-center gap-2">
            <FormField
              name={"link"}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Drop your link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button
              disabled={isLoading}
              type="submit"
              onClick={onSubmit}
              className="px-5 font-bold"
            >
              Go
            </Button>
          </div>
        </div>
      </Form>
      <LinkGenerateSuccessModal
        shortLink={modalState.shortLink || ""}
        closeModal={() => setModalState((prev) => ({ ...prev, show: false }))}
        show={modalState.show}
      />
    </>
  );
}
