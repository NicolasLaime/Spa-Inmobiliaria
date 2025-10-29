import { useState } from "react";
import { useCreateProperty } from "../../../hooks/useProperties";
import FormImages from "./FormImages"; // Importa tu componente

const CreateProperty = ({ onCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    bedrooms: 0,
    bathrooms: 0,
    Pool: false,
    gardeen: false,
    Quincho: false,
    price: 0,
    type: "VENTA",
    imageUrls: [],
  });

  const [files, setFiles] = useState([]);
  const createProperty = useCreateProperty();

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
      const formDataToSend = new FormData();

      const dto = { ...formData, price: Number(formData.price) };
      formDataToSend.append(
        "data",
        new Blob([JSON.stringify(dto)], { type: "application/json" })
      );

      files.forEach((file) => formDataToSend.append("images", file));

      await createProperty.mutateAsync(formDataToSend);

      alert("Propiedad creada con éxito!");
      onCreated();
      setFormData({
        title: "",
        description: "",
        address: "",
        city: "",
        bedrooms: 0,
        bathrooms: 0,
        Pool: false,
        gardeen: false,
        Quincho: false,
        price: 0,
        type: "VENTA",
        imageUrls: [],
      });
      setFiles([]);
    } catch (error) {
      console.error(error);
      alert("Error al crear la propiedad");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Crear Nueva Propiedad</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Descripción"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={formData.city}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <div className="flex gap-4">
          <input
            type="number"
            name="bedrooms"
            placeholder="Dormitorios"
            value={formData.bedrooms}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            min={0}
          />
          <input
            type="number"
            name="bathrooms"
            placeholder="Baños"
            value={formData.bathrooms}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            min={0}
          />
        </div>

        <div className="flex gap-4">
          <label>
            <input
              type="checkbox"
              name="Pool"
              checked={formData.Pool}
              onChange={handleChange}
            />{" "}
            Piscina
          </label>
          <label>
            <input
              type="checkbox"
              name="gardeen"
              checked={formData.gardeen}
              onChange={handleChange}
            />{" "}
            Jardín
          </label>
          <label>
            <input
              type="checkbox"
              name="Quincho"
              checked={formData.Quincho}
              onChange={handleChange}
            />{" "}
            Quincho
          </label>
        </div>

        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          min={0}
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="VENTA">Venta</option>
          <option value="ALQUILER">Alquiler</option>
          <option value="NEGOCIO">Negocio</option>
        </select>

        <FormImages files={files} setFiles={setFiles} />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={createProperty.isLoading}
        >
          {createProperty.isLoading ? "Creando..." : "Crear Propiedad"}
        </button>
      </form>
    </div>
  );
};

export default CreateProperty;
