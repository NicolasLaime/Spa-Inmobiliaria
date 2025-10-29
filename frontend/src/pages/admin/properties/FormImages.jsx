import { useState, useEffect } from "react";

const FormImages = ({ files, setFiles }) => {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }

    const objectUrls = files.map(file => URL.createObjectURL(file));
    setPreviews(objectUrls);

    // Liberar memoria al desmontar
    return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
  }, [files]);

  const handleRemove = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleAddFiles = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium text-gray-700">Imágenes de la propiedad</label>
      <input
        type="file"
        multiple
        onChange={handleAddFiles}
        className="w-full border px-3 py-2 rounded mb-4"
      />
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {previews.map((src, idx) => (
            <div key={idx} className="relative w-24 h-24">
              <img
                src={src}
                alt={`Preview ${idx + 1}`}
                className="w-full h-full object-cover rounded shadow"
              />
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormImages;
