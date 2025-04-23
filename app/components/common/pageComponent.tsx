import React, { useEffect } from 'react';

interface PageProps {
  totalPage: number;         // 실제 존재하는 페이지 수 (예: 17)
  currentPage: number;       // 1부터 시작
  setCurrentPage: (page: number) => void;
}

const PageComponent: React.FC<PageProps> = ({ totalPage, currentPage, setCurrentPage }) => {
  const pageSize = 10;

  // 1~1000페이지까지만만
  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPage || currentPage > 1000) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPage, setCurrentPage]);

  const pageGroup = Math.floor((currentPage - 1) / pageSize);
  const startPage = pageGroup * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPage);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      setCurrentPage((pageGroup - 1) * pageSize + 10);
    }
  };

  const handleNextGroup = () => {
    if ((pageGroup + 1) * pageSize < totalPage) {
      setCurrentPage((pageGroup + 1) * pageSize + 1);
    }
  };

  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        onClick={handlePrevGroup}
        disabled={pageGroup === 0}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        ◀ 이전
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNextGroup}
        disabled={endPage >= totalPage}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        다음 ▶
      </button>
    </div>
  );
};

export default PageComponent;
