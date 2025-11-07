// src/components/browse/Pagination.tsx
interface PaginationProps {
  currentPage: number; // 0-based
  totalPages: number;
  onPageChange: (page: number) => void; // 1-based
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Hàm tạo các nút số trang
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxPagesToShow = 5; // Chỉ hiển thị 5 nút số
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(currentPage - half, 0);
    let end = Math.min(start + maxPagesToShow - 1, totalPages - 1);

    if (end - start + 1 < maxPagesToShow) {
      start = Math.max(end - maxPagesToShow + 1, 0);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i + 1)} // Chuyển về 1-based
          className={`w-10 h-10 rounded-lg transition-colors ${
            i === currentPage
              ? 'bg-cinematic-accent text-white'
              : 'bg-cinematic-gray-light text-gray-400 hover:bg-cinematic-gray'
          }`}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  if (totalPages <= 1) {
    return null; // Không hiển thị gì nếu chỉ có 1 trang
  }

  return (
    <div className="mt-12 flex justify-center">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage)} // (currentPage là 0-based, +1 - 1 = 0)
          disabled={currentPage === 0}
          className="px-4 py-2 bg-cinematic-gray-light border border-gray-700 rounded-lg text-white hover:bg-cinematic-gray transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Trước
        </button>
        
        {renderPaginationButtons()}

        <button
          onClick={() => onPageChange(currentPage + 2)} // (currentPage là 0-based, +1 + 1 = +2)
          disabled={currentPage === totalPages - 1}
          className="px-4 py-2 bg-cinematic-gray-light border border-gray-700 rounded-lg text-white hover:bg-cinematic-gray transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sau
        </button>
      </div>
    </div>
  );
}