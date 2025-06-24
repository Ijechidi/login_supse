import React from "react";

export default function UserList({ users = [], text = "" }) {
  return (
    <div className="bg-background flex items-center rounded-full border p-1 shadow-sm">
      <div className="flex -space-x-1.5">
        {users.map((user, index) => (
          <img
            key={index}
            className="ring-background rounded-full ring-1"
            src={user.src}
            width={20}
            height={20}
            alt={user.alt || `Avatar ${index + 1}`}
          />
        ))}
      </div>
      {text && (
        <p className="text-muted-foreground px-2 text-xs">
          {text}
        </p>
      )}
    </div>
  );
}
