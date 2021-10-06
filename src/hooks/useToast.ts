import React from "react";

const useToast = (messageInput: string) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [message, setMessage] = React.useState(messageInput);

  return {
    message,
    setMessage: (m: string) => setMessage(m),
    isVisible,
    setIsVisible: (value: boolean) => setIsVisible(value),
  };
};

export default useToast;
