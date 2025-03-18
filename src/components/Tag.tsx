// Tag.tsx
import React, { useState } from 'react';

interface TagProps {
  value: string;
  onDelete: () => void;
}

const Tag: React.FC<TagProps> = ({ value, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => setIsOpen(!isOpen)}>▼</button>
      {isOpen && (
        <div>
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
          </ul>
        </div>
      )}
      <button onClick={onDelete}>×</button>
    </div>
  );
};

export default Tag;