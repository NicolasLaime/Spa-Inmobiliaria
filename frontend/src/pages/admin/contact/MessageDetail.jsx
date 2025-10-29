import { useMarkAsResponded, useDeleteMessage} from "../../../hooks/useContact";

const MessageDetail = ({ message, onBack }) => {
  const markAsResponded = useMarkAsResponded();
  const deleteMessage = useDeleteMessage();

  const handleMarkResponded = async () => {
    await markAsResponded.mutateAsync(message.id);
    onBack();
  };

  const handleDelete = async () => {
    if (window.confirm("¿Eliminar este mensaje?")) {
      await deleteMessage.mutateAsync(message.id);
      onBack();
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">
        ← Volver
      </button>

      <h2 className="text-xl font-bold mb-2">{message.name}</h2>
      <p className="text-gray-600 mb-2">{message.email}</p>
      {message.propertyTitle && (
        <p className="text-sm text-blue-600 mb-2">
          🏡 Interesado en: <strong>{message.propertyTitle}</strong>
        </p>
      )}
      <p className="mb-4">{message.message}</p>
      <p className="text-sm text-gray-500 mb-4">
        Enviado: {new Date(message.sentAt).toLocaleString()}
      </p>

      {!message.responded && (
        <button
          onClick={handleMarkResponded}
          className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
        >
          Marcar como respondido
        </button>
      )}

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Eliminar
      </button>
    </div>
  );
};

export default MessageDetail;
