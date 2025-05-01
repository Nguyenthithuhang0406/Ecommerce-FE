import React, { useState } from "react";
import { X } from "lucide-react";

const ImageUploader = ({ images, onUpload, onRemove, maxImages = 4 }) => {
	const [draggedOver, setDraggedOver] = useState(false);

	const handleImageUpload = (files) => {
		const fileArray = Array.from(files);

		const remainingSlots = maxImages - images.length;
		const filesToProcess = fileArray.slice(0, remainingSlots);

		const imagePromises = filesToProcess.map((file) => {
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.onload = (e) => resolve(e.target.result);
				reader.readAsDataURL(file);
			});
		});

		Promise.all(imagePromises).then((imageUrls) => {
			onUpload(imageUrls);
		});
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setDraggedOver(false);
		const files = e.dataTransfer.files;
		handleImageUpload(files);
	};

	return (
		<div className="mt-6">
			<label className="block text-sm font-medium text-gray-700 mb-2">
				Images (Max {maxImages})
			</label>
			<div
				onDragOver={(e) => {
					e.preventDefault();
					setDraggedOver(true);
				}}
				onDragLeave={() => setDraggedOver(false)}
				onDrop={handleDrop}
				className={`mt-1 border-2 border-dashed rounded-lg p-4 text-center ${
					draggedOver
						? "border-orange-500 bg-orange-50"
						: "border-gray-300"
				}`}
			>
				<p className="text-gray-500 mb-2">
					Drag and drop images here or click to upload
				</p>
				<input
					type="file"
					accept="image/*"
					multiple
					onChange={(e) => handleImageUpload(e.target.files)}
					className="hidden"
					id="image-upload"
				/>
				<label
					htmlFor="image-upload"
					className="inline-block px-4 py-2 bg-orange-500 text-white rounded-lg cursor-pointer hover:bg-orange-600"
				>
					Upload Images
				</label>
				<p className="text-xs text-gray-500 mt-2">
					Supported formats: JPG, PNG, WEBP
				</p>
			</div>

			{images.length > 0 && (
				<div className="mt-4">
					<h4 className="text-sm font-medium text-gray-700 mb-2">
						Uploaded Images
					</h4>
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
						{images.map((image, index) => (
							<div
								key={index}
								className="relative aspect-square rounded-lg overflow-hidden border border-gray-200"
							>
								<img
									src={image}
									alt={`Product image ${index + 1}`}
									className="w-full h-full object-cover"
								/>
								<button
									type="button"
									onClick={() => onRemove(index)}
									className="absolute top-2 right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
								>
									<X className="h-4 w-4" />
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			{images.length === 0 && (
				<div className="mt-2 text-center text-sm text-gray-500">
					No images uploaded. Default placeholder will be used.
				</div>
			)}
		</div>
	);
};

export default ImageUploader;
