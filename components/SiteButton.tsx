import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

export default function SiteButton({ size = "default", ...props }: ButtonProps) {
  return <Button size={size} {...props} />;
}
