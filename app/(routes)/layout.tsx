// /chat/[id]/layout.tsx

import React from 'react';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children} {/* This will render the page content */}
    </div>
  );
};

export default ChatLayout;
