import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { editTodo, getTodoByTno } from "~/api/todoAPI";

const TodoEditPage = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const { tno } = useParams();  // URL 파라미터에서 tno 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    // Todo를 서버에서 가져오는 부분
    const fetchTodo = async () => {
      if (tno) {
        try {
          const fetchedTodo = await getTodoByTno(Number(tno));
          setTodo(fetchedTodo);
          setTitle(fetchedTodo.title);
          setWriter(fetchedTodo.writer);
        } catch (error) {
          console.error("Error fetching Todo:", error);
        }
      }
    };
    fetchTodo();
  }, [tno]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      const updatedTodo = {
        tno: todo.tno,
        title,
        writer,
        regDate: todo.regDate,
        modDate: new Date(),  // 수정일 갱신
      };

      try {
        const result = await editTodo(todo.tno, updatedTodo);
        console.log("Todo updated:", result);
        navigate(`/todo/read/${todo.tno}`);  // 수정 후 해당 Todo 페이지로 이동
      } catch (error) {
        console.error("Error updating Todo:", error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 border rounded shadow">
      <h2 className="text-3xl font-semibold mb-4">Edit Todo</h2>
      {todo ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              placeholder="Enter title"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="writer" className="block text-sm font-medium text-gray-700">Writer</label>
            <input
              id="writer"
              type="text"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              placeholder="Enter writer name"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Save Changes
          </button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TodoEditPage;
