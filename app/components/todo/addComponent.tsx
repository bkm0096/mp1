import React, { type FormEvent, useRef, useState } from "react";
import { testTodoAddForm } from "~/api/todoAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingComponent from "~/components/common/loadingComponent";
import ResultComponent from "~/components/common/resultComponent";
import { useNavigate } from "react-router";

function TodoAddComponent() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [resultMsg, setResultMsg] = useState("");

  const addMutation = useMutation({
    mutationFn: testTodoAddForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setResultMsg("R");
    },
    onError: () => {
      alert("등록 중 오류가 발생했습니다.");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    addMutation.mutate(formData);
  };

  return (
    <div className="relative">
      {addMutation.isPending && <LoadingComponent isLoading />}
      {resultMsg && (
        <ResultComponent
          msg={resultMsg}
          closeFn={() => {
            setResultMsg("");
            navigate("/todo/list");
          }}
        />
      )}

      <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">📝 새로운 Todo 작성</h2>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
              제목
            </label>
            <input
              name="title"
              id="title"
              type="text"
              required
              placeholder="제목을 입력하세요"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="writer" className="block text-sm font-semibold text-gray-700 mb-1">
              작성자
            </label>
            <input
              name="writer"
              id="writer"
              type="text"
              required
              placeholder="작성자 이름"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-semibold text-gray-700 mb-1">
              첨부파일
            </label>
            <input
              name="file"
              id="file"
              type="file"
              multiple
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-200"
          >
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default TodoAddComponent;
