import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

const PaginationBlog = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  
    return (
      <div className="flex  mt-8">
        <ul className="flex space-x-2">
          {currentPage > 1 && (
            <li>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-[#ff6347] hover:text-white duration-300"
              >
                <ChevronLeft size={20}/>
              </button>
            </li>
          )}
  
          {pages.map((page) => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={`flex items-center justify-center w-10 h-10 rounded-md ${
                  currentPage === page
                    ? "bg-[#ff6347] text-white"
                    : "border border-gray-300 bg-white text-gray-700 hover:bg-[#ff6347] hover:text-white duration-300"
                }`}
              >
                {page}
              </button>
            </li>
          ))}
  
          {currentPage < totalPages && (
            <li>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-[#ff6347] hover:text-white duration-300"   
              >
                <ChevronRight size={20}/>
              </button>
            </li>
          )}
        </ul>
      </div>
    );
}

export default PaginationBlog