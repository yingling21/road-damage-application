"use client"

import { useState } from 'react';

type Toast = {
  id: string;
  title: string;
  description: string;
};

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]); // ✅ Explicitly set type

  const toast = ({ title, description }: { title: string; description: string }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { id, title, description }; // ✅ Ensure newToast follows Toast type

    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id)); // ✅ Type-safe
    }, 3000);

    return id;
  };

  return { toast, toasts };
}