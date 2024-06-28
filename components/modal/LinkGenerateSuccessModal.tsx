"use client";

import { ClipboardCheck, Clipboard } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React, { useState } from "react";

type LinkGenerateSuccessModalProps = {
  shortLink: string;
  show: boolean;
  closeModal: () => void;
};

export default function LinkGenerateSuccessModal(
  props: LinkGenerateSuccessModalProps,
) {
  const { shortLink, show, closeModal } = props;
  const [hasCopied, setHasCopied] = useState(false);
  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-green-500">
            Success
          </AlertDialogTitle>
          <AlertDialogDescription>
            Copy and paste in your browser!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="p-3">
          <div className="flex gap-2 items-center">
            <Input value={shortLink} readOnly />{" "}
            <Button
              onClick={async () => {
                await navigator.clipboard.writeText(shortLink);
                setHasCopied(true);
                setTimeout(() => {
                  setHasCopied(false);
                }, 1000);
              }}
              variant={"outline"}
            >
              {hasCopied ? (
                <ClipboardCheck
                  width={16}
                  height={16}
                  className="text-green-500"
                />
              ) : (
                <Clipboard width={16} height={16} />
              )}
            </Button>
          </div>
        </div>
        <AlertDialogFooter>
          <Button onClick={closeModal} variant={"outline"}>
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
