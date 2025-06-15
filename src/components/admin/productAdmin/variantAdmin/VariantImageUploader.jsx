import React, { useRef, useState } from "react";
import { X, Image as ImageIcon, UploadCloud } from "lucide-react";

const VariantImageUploader = ({ imageUrl, onChange }) => {
	const [preview, setPreview] = useState(imageUrl || null);
	const [draggedOver, setDraggedOver] = useState(false);
	const fileInputRef = useRef();

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setPreview(URL.createObjectURL(file));
		onChange(file);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setDraggedOver(false);
		const file = e.dataTransfer.files[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
			onChange(file);
		}
	};

	const handleRemove = () => {
		setPreview(null);
		onChange(null);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	return (
		<div className="mb-4">
			<div
				className={`relative w-32 h-32 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer bg-gray-50
          ${draggedOver ? "border-orange-500 bg-orange-50" : "border-gray-300"}
        `}
				onDragOver={(e) => {
					e.preventDefault();
					setDraggedOver(true);
				}}
				onDragLeave={() => setDraggedOver(false)}
				onDrop={handleDrop}
				onClick={() =>
					fileInputRef.current && fileInputRef.current.click()
				}
			>
				{preview ? (
					<>
						<img
							src={preview}
							alt="preview"
							className="w-full h-full object-cover rounded-lg"
						/>
						<button
							type="button"
							className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
							onClick={(e) => {
								e.stopPropagation();
								handleRemove();
							}}
							title="Xóa ảnh"
						>
							<X className="h-4 w-4 cursor-pointer" />
						</button>
					</>
				) : (
					<div className="flex flex-col items-center text-gray-400">
						<UploadCloud className="w-8 h-8 mb-1" />
						<span className="text-xs">
							Kéo thả hoặc nhấn để tải ảnh
						</span>
					</div>
				)}
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					className="hidden"
					onChange={handleFileChange}
				/>
			</div>
			<p className="text-xs text-gray-500 mt-1">Hỗ trợ JPG, PNG, WEBP.</p>
		</div>
	);
};

export default VariantImageUploader;
