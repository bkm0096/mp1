import { useQuery } from "@tanstack/react-query";
import { testTodoList } from "~/api/todoAPI";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import PageComponent from "../common/pageComponent";
import LoadingComponent from "../common/loadingComponent";

function TodoListComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const defaultPageSize = 9;
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

  // 로딩 중일 때는 LoadingComponent 표시
  if (isLoading) return <LoadingComponent isLoading={true} />;

  const totalPages = data.totalPages;
  const currentPage = page;

  const handleClickTodo = (tno: number) => {
    navigate(`/todo/read/${tno}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
        📝 Todo 목록
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.content.map((todo: any) => (
          <div
            key={todo.tno}
            onClick={() => handleClickTodo(todo.tno)}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer p-6 border border-gray-200 hover:border-blue-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 truncate">{todo.title}</h3>
                <span className="text-sm font-medium text-gray-600 mt-1">{todo.writer}</span>
              </div>
              <span className="text-sm font-medium text-blue-500">{todo.tno}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center items-center">
        <PageComponent
          totalPage={totalPages}
          currentPage={currentPage}
          setCurrentPage={setPage}
        />
      </div>
    </div>
  );
}

export default TodoListComponent;
