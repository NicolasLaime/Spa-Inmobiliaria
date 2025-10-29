import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPropertyById } from "../../services/PropertiesService";
import ContactForm from "../../components/contactForm";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [accordionOpen, setAccordionOpen] = useState({ shipping: false, contact: false });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await getPropertyById(id);
        setProperty(res);
      } catch (error) {
        console.error("Error al obtener la propiedad:", error);
      }
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p className="text-center mt-10 text-gray-500 text-lg">Cargando propiedad...</p>;

  const toggleAccordion = (section) => {
    setAccordionOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="min-h-screen bg-cream-100 py-12 px-4 md:px-6 2xl:px-20">
      {/* TITULO PRINCIPAL */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 text-center mb-12">
        Detalles de la Propiedad
      </h1>

      <div className="max-w-6xl mx-auto md:flex items-start justify-center">

        {/* Carrusel de imágenes */}
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
          <img
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            src={property.imageUrls?.[selectedImage] || "/placeholder.jpg"}
            alt={property.title}
          />
          <div className="flex mt-4 space-x-3">
            {property.imageUrls?.map((img, idx) => (
              <img
                key={idx}
                onClick={() => setSelectedImage(idx)}
                src={img}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${selectedImage === idx ? "border-blue-600" : "border-gray-200"
                  }`}
                alt={`Thumbnail ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden w-full mb-6">
          <img
            className="w-full h-64 object-cover rounded-lg shadow-lg"
            src={property.imageUrls?.[0] || "/placeholder.jpg"}
            alt={property.title}
          />
        </div>

        {/* Información de la propiedad */}
        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6 bg-cream-100 p-4 rounded-lg shadow">
          <button
            onClick={() => navigate("/")}
            className="mb-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            ← Volver al home
          </button>

          <div className="border-b border-gray-200 pb-4">
            <p className="text-sm text-gray-600 mb-1">Propiedad destacada</p>
            <h2 className="lg:text-3xl text-2xl font-semibold text-gray-800">{property.title}</h2>
          </div>

          <div className="py-4 border-b border-gray-200 flex justify-between items-center">
            <p className="text-base font-semibold text-gray-800">Precio</p>
            <p className="text-xl font-bold text-blue-600">${property.price}</p>
          </div>

          <div className="py-4 border-b border-gray-200 flex justify-between items-center">
            <p className="text-base font-semibold text-gray-800">Dirección</p>
            <p className="text-gray-700">{property.address}</p>
          </div>

          {/* Descripción */}
          <div className="py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Descripción</h3>
            <p className="text-gray-700">{property.description}</p>
          </div>

          {/* Accordion */}
          <div className="mt-6 space-y-3">
            <div className="border border-gray-200 rounded">
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full px-4 py-3 flex justify-between items-center text-gray-800 font-medium"
              >
                Detalles adicionales
                <svg
                  className={`w-4 h-4 transform transition-transform ${accordionOpen.shipping ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {accordionOpen.shipping && (
                <div className="px-4 py-3 text-gray-600 text-sm">
                  Información adicional sobre la propiedad, como medidas, antigüedad o comodidades.
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded">
              <button
                onClick={() => toggleAccordion("contact")}
                className="w-full px-4 py-3 flex justify-between items-center text-gray-800 font-medium"
              >
                Contacto
                <svg
                  className={`w-4 h-4 transform transition-transform ${accordionOpen.contact ? "rotate-180" : ""
                    }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {accordionOpen.contact && (
                <div className="px-4 py-3">
                  <ContactForm propertyId={property.id} />
                </div>
              )}
            </div>
          </div>

          {/* Mapa */}
          <div className="mt-6 h-64 rounded overflow-hidden shadow-lg border">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(property.address)}&output=embed`}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
