import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { editTodo, getTodoByTno } from "~/api/todoAPI";
import ResultComponent from "~/components/common/resultComponent";

const TodoEditComponent = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [resultMsg, setResultMsg] = useState("");

  const { tno } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      if (tno) {
        try {
          const fetchedTodo = await getTodoByTno(Number(tno));
          setTodo(fetchedTodo);
          setTitle(fetchedTodo.title);
          setWriter(fetchedTodo.writer);
        } catch (error) {
          console.error("Error fetching Todo:", error);
          alert("Todo 데이터를 불러올 수 없습니다.");
        }
      }
    };
    fetchTodo();
  }, [tno]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      const updatedTodo = {
        ...todo,
        title,
        writer,
        modDate: new Date(),
      };

      try {
        await editTodo(todo.tno, updatedTodo);
        setResultMsg("수정 완료");
      } catch (error) {
        console.error("Error updating Todo:", error);
        alert("수정 실패");
      }
    }
  };

  if (!todo) return null;

  return (
    <div>
      {resultMsg && (
        <ResultComponent
          msg={resultMsg}
          closeFn={() => {
            setResultMsg("");
            navigate(`/todo/read/${todo.tno}`);
          }}
        />
      )}

      <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-blue-700 text-center">🛠️ Todo 수정</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="제목을 입력하세요"
              required
            />
          </div>

          <div>
            <label htmlFor="writer" className="block text-sm font-semibold text-gray-700 mb-1">
              작성자
            </label>
            <input
              id="writer"
              type="text"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="작성자 이름을 입력하세요"
              required
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoEditComponent;