import * as React from "react";

// Simplified toast hook without UI dependencies
function useToast() {
  const [toasts, setToasts] = React.useState<any[]>([]);

  const toast = (message: { title?: string; description?: string }) => {
    console.log('Toast:', message);
  };

  const dismiss = () => {
    setToasts([]);
  };

  return {
    toasts,
    toast,
    dismiss,
  };
}

export { useToast };