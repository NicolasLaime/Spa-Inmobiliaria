import { useSearchProperties, useDeleteProperty } from "../../../hooks/useProperties";

const DeleteProperty = () => {
  const { data, isLoading, error } = useSearchProperties({ page: 0, size: 50 });
  const { mutate: deleteProperty } = useDeleteProperty();

  if (isLoading) return <p>Cargando propiedades...</p>;
  if (error) return <p>Error al cargar propiedades</p>;

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar esta propiedad?")) {
      deleteProperty(id, {
        onSuccess: () => alert("Propiedad eliminada correctamente ✅"),
        onError: () => alert("❌ Error al eliminar la propiedad"),
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Borrar Propiedad</h2>
      <ul className="space-y-2">
        {data?.content?.map((property) => (
          <li key={property.id} className="flex justify-between items-center p-2 border rounded">
            <span>{property.title} - {property.city} - ${property.price}</span>
            <button
              onClick={() => handleDelete(property.id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              🗑️ Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteProperty;
