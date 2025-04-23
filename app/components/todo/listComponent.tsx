import { useQuery } from "@tanstack/react-query";
import { testTodoList } from "~/api/todoAPI";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import PageComponent from "../common/pageComponent";

function TodoListComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const defaultPageSize = 10;
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialSize = parseInt(searchParams.get("size") || `${defaultPageSize}`, 10);

  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  useEffect(() => {
    setSearchParams({ page: page.toString(), size: size.toString() });
  }, [page, size, setSearchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ["todos", page, size],
    queryFn: () => testTodoList(page - 1, size),
  });

  if (isLoading) return <div>로딩 중...</div>;

  const totalPages = data.totalPages;
  const currentPage = page;

  const handleClickTodo = (tno: number) => {
    navigate(`/todo/read/${tno}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Todo 목록</h2>

      <ul className="space-y-2">
        {data.content.map((todo: any) => (
          <li
            key={todo.tno}
            onClick={() => handleClickTodo(todo.tno)}
            className="border-b py-2 cursor-pointer hover:bg-gray-100 transition"
          >
            <div className="font-semibold">{todo.title}</div>
            <div className="text-sm text-gray-500">
              {todo.writer} | {new Date(todo.regDate).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>

      <PageComponent
        totalPage={totalPages}
        currentPage={currentPage}
        setCurrentPage={setPage}
      />
    </div>
  );
}

export default TodoListComponent;
