import { ReactNode } from "react";

export interface AlertProps {
  message?: string;
  height?: number;
  state?: "success" | "error" | "warning" | "info";
  canDismiss?: boolean;
  onDismiss?: () => void;
  children?: ReactNode;
  RTL?: boolean;
}
