// /chat/[id]/layout.tsx

import React from 'react';

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Chat ID: Dynamic Chat ID</h1>
      {children} {/* This will render the page content */}
    </div>
  );
};

export default ChatLayout;
