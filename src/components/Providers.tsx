"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            borderRadius: "10px",
            maxWidth: "380px",
          },
        }}
      />
    </>
  );
}
