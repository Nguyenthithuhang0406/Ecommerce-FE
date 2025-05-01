import React from 'react';
import { X } from 'lucide-react';

const DeleteProductModal = ({ isOpen, onClose, onConfirm, product }) => {
  if (!isOpen || !product) return null;
  
  return (
    <div className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Xác nhận xóa sản phẩm</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Bạn có chắc chắn muốn xóa sản phẩm này ?
          </p>
          
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden">
              <img 
                src={product.image[0]} 
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-3">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-500">{product.id}</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(product.id)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductModal;