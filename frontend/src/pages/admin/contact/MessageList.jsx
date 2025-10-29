import { useState } from "react";
import { useGetAllMessages } from "../../../hooks/useContact"; 
import MessageDetail from "./MessageDetail";

const MessagesList = () => {
  const { data: messages = [], isLoading, isError } = useGetAllMessages();
  const [selectedMessage, setSelectedMessage] = useState(null);

  if (isLoading) return <p>Cargando mensajes...</p>;
  if (isError) return <p>Error al cargar mensajes.</p>;

  if (selectedMessage)
    return (
      <MessageDetail
        message={selectedMessage}
        onBack={() => setSelectedMessage(null)}
      />
    );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Mensajes Recibidos</h2>
      {messages.length === 0 ? (
        <p>No hay mensajes.</p>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setSelectedMessage(msg)}
              className={`p-4 border rounded cursor-pointer ${
                msg.responded ? "bg-green-50" : "bg-white"
              } hover:bg-gray-100`}
            >
              <p className="font-semibold">{msg.name}</p>
              <p className="text-gray-600">{msg.email}</p>
              <p className="text-sm text-gray-500 truncate">{msg.message}</p>
              {msg.propertyTitle && (
                <p className="text-sm mt-1 font-medium text-blue-600">
                  🏡 Propiedad: {msg.propertyTitle}
                </p>
              )}
              <p className="text-xs mt-1 text-gray-500">
                {new Date(msg.sentAt).toLocaleString()}{" "}
                {msg.responded && "(Respondido)"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesList;
