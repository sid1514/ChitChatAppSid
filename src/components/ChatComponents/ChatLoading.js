import React from "react";

const ChatLoading = () => {
  return (
    <div>
      <div class=" rounded-md p-4 w-full mx-auto h-full">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-6 py-1">
            <div class="h-2 bg-slate-200 rounded"></div>
            <div class="space-y-3">
              <div class="h-2 bg-slate-200 rounded col-span-4"></div>
              <div class="h-2 bg-slate-200 rounded col-span-4"></div>
              <div class="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLoading;
