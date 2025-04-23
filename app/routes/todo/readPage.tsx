import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getTodoByTno } from "~/api/todoAPI";
import TodoReadComponent from "~/components/todo/readComponent";


function ReadPage() {
  const { tno } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["todo", tno],
    queryFn: () => getTodoByTno(parseInt(tno || "0", 10)),
    enabled: !!tno,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error || !data) return <div>오류가 발생했거나 데이터를 찾을 수 없습니다.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Todo 상세보기</h2>
      <TodoReadComponent todo={data} />
    </div>
  );
}

export default ReadPage;
