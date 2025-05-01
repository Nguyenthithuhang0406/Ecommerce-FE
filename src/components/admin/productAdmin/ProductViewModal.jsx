
import React from 'react';
import { X } from 'lucide-react';
import StatusBadge from './StatusBadge';

const ProductViewModal = ({ product, onClose, onEdit }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-[#0000009e] bg-opacity-50 flex items-center justify-center p-4 overflow-auto z-10">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg text-gray font-semibold">Product Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-1/3">
              <div className="grid grid-cols-2 gap-2">
                {product.image.map((img, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={img} 
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">Product ID</div>
                  <div className="font-medium">{product.id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">SKU</div>
                  <div className="font-medium">{product.sku}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-medium">{product.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Last Updated</div>
                  <div className="font-medium">{product.lastUpdated}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="font-medium text-lg">{product.price}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status</div>
                  <StatusBadge status={product.status} />
                </div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Description</div>
                <p className="text-gray-700">{product.description}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-500 mb-2">Stock Information</div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Available Stock:</span>
                  <span className="font-medium">{product.stock} units</span>
                </div>
                {product.stock > 0 && (
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${product.stock < 20 ? 'bg-red-500' : product.stock < 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min(product.stock, 150) / 1.5}%` }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Rating</div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="text-2xl font-semibold mr-2">{product.rating}</div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5"
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-500 mb-2">Variations</div>
              <div className="flex flex-wrap gap-2">
                {product.variations.map((variation, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm">
                    {variation}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-2">Tags</div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Close
            </button>
            <button
              onClick={() => onEdit(product)}
              className="px-4 py-2 border border-gray-300 bg-orange-500 rounded-lg text-white "
            >
              Edit Product
            </button>
            {product.stock < 20 && product.status !== 'Out of Stock' && (
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">Restock</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModal;