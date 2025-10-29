import { useState } from "react";
import { useAllPropertiesAdmin, useDeleteProperty, useUpdateProperty } from "../../../hooks/useProperties";
import FormImages from "./FormImages";

const ListProperties = () => {
  const { data, isLoading, error } = useAllPropertiesAdmin(0, 50);
  const deleteProperty = useDeleteProperty();
  const updateProperty = useUpdateProperty();

  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);

  if (isLoading) return <p className="text-gray-500 text-center mt-6">Cargando propiedades...</p>;
  if (error) return <p className="text-red-500 text-center mt-6">Error al cargar propiedades ❌</p>;

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta propiedad?")) {
      deleteProperty.mutate(id, {
        onSuccess: () => alert("Propiedad eliminada ✅"),
        onError: () => alert("❌ Error al eliminar la propiedad"),
      });
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title || "",
      description: property.description || "",
      address: property.address || "",
      city: property.city || "",
      price: property.price || 0,
      type: property.type || "VENTA",
      bedrooms: property.bedrooms || 0,
      bathrooms: property.bathrooms || 0,
      Pool: property.Pool || false,
      gardeen: property.gardeen || false,
      Quincho: property.Quincho || false,
    });
    setFiles([]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dto = { ...(formData || {}), price: Number(formData.price) };
      await updateProperty.mutateAsync({ id: editingProperty.id, dto, files });
      alert("Propiedad actualizada ✅");
      setEditingProperty(null);
      setFiles([]);
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la propiedad ❌");
    }
  };

  
  if (editingProperty) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Actualizar Propiedad</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Dirección"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ciudad"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="Dormitorios"
              min={0}
              className="border border-gray-300 px-3 py-2 rounded"
            />
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="Baños"
              min={0}
              className="border border-gray-300 px-3 py-2 rounded"
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="Pool" checked={formData.Pool} onChange={handleChange} />
              Piscina
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="gardeen" checked={formData.gardeen} onChange={handleChange} />
              Jardín
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="Quincho" checked={formData.Quincho} onChange={handleChange} />
              Quincho
            </label>
          </div>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Precio"
            min={0}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          >
            <option value="VENTA">Venta</option>
            <option value="ALQUILER">Alquiler</option>
            <option value="NEGOCIO">Negocio</option>
          </select>

          <FormImages files={files} setFiles={setFiles} />

          <div className="flex gap-4 mt-4">
            <button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
              Actualizar Propiedad
            </button>
            <button
              type="button"
              onClick={() => setEditingProperty(null)}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }

  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🏠 Propiedades del Administrador</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.content?.map((property) => (
          <div key={property.id} className="bg-white border rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
            <img
              src={property.imageUrls?.[0] || "/no-image.jpg"}
              alt={property.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
              <p className="text-gray-600 text-sm">{property.city}</p>
              <p className="text-green-700 font-bold">${property.price}</p>
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => handleEdit(property)}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                >
                  ✏️ Actualizar
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {data?.content?.length === 0 && <p className="text-center text-gray-500 mt-6">No hay propiedades registradas.</p>}
    </div>
  );
};

export default ListProperties;
