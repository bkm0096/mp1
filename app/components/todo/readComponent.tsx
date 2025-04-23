import { useNavigate } from 'react-router';
import axios from 'axios';

interface TodoReadProps {
  todo: {
    tno: number;
    title: string;
    writer: string;
    regDate: string;
    modDate: string;
    file?: any[];
  };
}

const host = "http://localhost:8080/api/v1/todos";

function TodoReadComponent({ todo }: TodoReadProps) {
  const navigate = useNavigate();

  // 삭제 요청 함수
  const handleDelete = async () => {
    try {
      await axios.delete(`${host}/${todo.tno}`);
      alert('Todo가 삭제되었습니다!');
      navigate('/todo/list');  // 삭제 후 Todo 목록 페이지로 이동
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  // 수정 페이지로 이동
  const handleEdit = () => {
    navigate(`/todo/edit/${todo.tno}`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
        📋 Todo 상세 정보
      </h2>
      <div className="space-y-2 text-gray-700">
        <p><strong>번호:</strong> {todo.tno}</p>
        <p><strong>제목:</strong> {todo.title}</p>
        <p><strong>작성자:</strong> {todo.writer}</p>
        <p><strong>등록일:</strong> {new Date(todo.regDate).toLocaleString()}</p>
        <p><strong>수정일:</strong> {new Date(todo.modDate).toLocaleString()}</p>
        {todo.file && todo.file.length > 0 && (
          <div>
            <strong>첨부파일:</strong>
            <ul className="list-disc ml-6">
              {todo.file.map((f, idx) => (
                <li key={idx}>{f.originalname || '파일 이름 없음'}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 수정/삭제 버튼 */}
      <div className="flex justify-between">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

export default TodoReadComponent;
