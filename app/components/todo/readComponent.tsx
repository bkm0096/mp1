import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import ResultComponent from "../common/resultComponent";
import LoadingComponent from "../common/loadingComponent";

const host = "http://localhost:8080/api/v1/todos";

const TodoReadComponent = () => {
  const navigate = useNavigate();
  const { tno } = useParams();
  const [todo, setTodo] = useState<any>(null);
  const [resultMsg, setResultMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tno) {
      const fetchTodo = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${host}/${tno}`);
          setTodo(response.data);
        } catch (error) {
          console.error("Todo 데이터를 가져오는데 실패했습니다.", error);
          alert("Todo 데이터를 불러오는 데 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchTodo();
    }
  }, [tno]);

  const handleDelete = async () => {
    if (!todo) return;

    setIsLoading(true);
    try {
      await axios.delete(`${host}/${todo.tno}`);
      setResultMsg("삭제 완료");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    if (!todo) return;

    setIsLoading(true);
    navigate(`/todo/edit/${todo.tno}`);
    setIsLoading(false);
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    const resultMsgElement = document.querySelector(".result-msg-container");
    const todoReadContainer = document.querySelector(".todo-read-container");

    if (
      resultMsgElement && todoReadContainer &&
      !resultMsgElement.contains(e.target as Node) &&
      !todoReadContainer.contains(e.target as Node) &&
      resultMsg
    ) {
      navigate("/todo/list");
    }
  };

  if (!todo) return null;

  return (
    <div onClick={handleOutsideClick}>
      <LoadingComponent isLoading={isLoading} />
      {resultMsg && (
        <ResultComponent
          msg={resultMsg}
          closeFn={() => {
            setResultMsg("");
            navigate("/todo/list");
          }}
        />
      )}

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6 todo-read-container">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold text-blue-600">
            📋 Todo 상세 정보
          </h2>
          <span className="text-sm text-gray-500">{todo.tno}</span>
        </div>

        <div className="space-y-4 text-gray-700">
          <p><strong>제목:</strong> {todo.title}</p>
          <p><strong>작성자:</strong> {todo.writer}</p>
          <p><strong>등록일:</strong> {new Date(todo.regDate).toLocaleString()}</p>
          <p><strong>수정일:</strong> {new Date(todo.modDate).toLocaleString()}</p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleEdit}
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 w-full sm:w-auto"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full sm:w-auto"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoReadComponent;
