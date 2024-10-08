import { Button } from "@nextui-org/react";
import React from "react";

export function OutlinedButton({
  onClick,
  children,
  uppercase,
}: {
  onClick?: () => void;
  children: string | React.ReactNode;
  uppercase?: boolean;
}) {
  return (
    <Button
      variant="bordered"
      className={`border-white border-1 ${
        uppercase && "uppercase"
      } text-content1 hover:scale-105`}
      radius="sm"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function FilledButton({
  onClick,
  children,
  uppercase,
  type,
}: {
  onClick?: () => void;
  children: string | React.ReactNode;
  uppercase?: boolean;
  type: "submit" | "button" | "reset";
}) {
  return (
    <Button
      variant="bordered"
      className={`background-red-700 ${
        uppercase && "uppercase"
      } text-content1 hover:scale-105`}
      radius="sm"
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );
}
