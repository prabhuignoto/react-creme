import { ReactNode } from "react";

export interface AlertProps {
  RTL?: boolean;
  canDismiss?: boolean;
  children?: ReactNode;
  height?: number;
  message?: string;
  onDismiss?: () => void;
  state?: "success" | "error" | "warning" | "info";
}
