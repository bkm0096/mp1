import React, { useEffect } from 'react';

interface PageProps {
  totalPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const PageComponent: React.FC<PageProps> = ({ totalPage, currentPage, setCurrentPage }) => {
  const pageSize = 10;

  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPage || currentPage > 1000) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPage, setCurrentPage]);

  const pageGroup = Math.floor((currentPage - 1) / pageSize);
  const startPage = pageGroup * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPage);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      setCurrentPage((pageGroup - 1) * pageSize + 1);
    }
  };

  const handleNextGroup = () => {
    if ((pageGroup + 1) * pageSize < totalPage) {
      setCurrentPage((pageGroup + 1) * pageSize + 1);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
      {pageGroup > 0 && (
        <button
          onClick={handlePrevGroup}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl text-sm sm:text-base transition"
        >
          ◀ 이전
        </button>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-2 rounded-xl text-sm sm:text-base transition font-medium ${
            currentPage === page
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPage && (
        <button
          onClick={handleNextGroup}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl text-sm sm:text-base transition"
        >
          다음 ▶
        </button>
      )}
    </div>
  );
};

export default PageComponent;
