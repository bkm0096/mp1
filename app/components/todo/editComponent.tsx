import React, { useState, useEffect } from "react";

interface TodoEditComponentProps {
  todo: Todo;
  onSave: (title: string, writer: string) => void;
}

function TodoEditComponent({ todo, onSave }: TodoEditComponentProps) {
  const [title, setTitle] = useState(todo.title);
  const [writer, setWriter] = useState(todo.writer);

  useEffect(() => {
    setTitle(todo.title);
    setWriter(todo.writer);
  }, [todo]);

  const handleSave = () => {
    onSave(title, writer);
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-2">📋 Todo 수정</h3>

      <div className="mb-2">
        <strong>제목:</strong>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      <div className="mb-2">
        <strong>작성자:</strong>
        <input
          type="text"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mt-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default TodoEditComponent;
