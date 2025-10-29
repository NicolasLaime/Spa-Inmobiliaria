# 🏠 Proyecto Inmobiliaria

Aplicación web full stack para la gestión de propiedades de una inmobiliaria.  
Incluye un panel de administración (Dashboard) protegido para gestionar las propiedades y un sistema de mensajes de contacto.

---

## 🚀 Tecnologías utilizadas

### 🔹 Backend — *Spring Boot*
- **Spring Boot** (Java)
- **Spring Data JPA** — para la gestión de entidades y base de datos relacional.
- **Spring Security con JWT** — autenticación y autorización mediante tokens.
- **Cloudinary** — almacenamiento de imágenes de propiedades en la nube.
- **ModelMapper** — para mapear entidades y DTOs.
- **MySQL** — base de datos relacional.
- **REST API** — expone endpoints para consumir desde el frontend.

#### 📦 Funcionalidades del backend:
- CRUD completo de **Propiedades** (crear, listar, editar, eliminar).
- CRUD de **Mensajes** enviados por usuarios interesados en las propiedades.
- **Autenticación JWT** (solo el administrador puede acceder al Dashboard).
- **Subida de imágenes** a Cloudinary.
- **Validaciones** y manejo de errores personalizado.

---

### 🔹 Frontend — *React + Tailwind CSS*
- **React** (SPA — Single Page Application)
- **Zustand** — para el manejo global del estado (autenticación, propiedades, mensajes).
- **Axios** — para consumir la API del backend.
- **React Router DOM** — para la navegación protegida (rutas privadas del admin).
- **Tailwind CSS** — para estilos modernos, limpios y responsive.

#### 🧩 Funcionalidades del frontend:
- Visualización de propiedades en una interfaz amigable y rápida.
- Envío de mensajes desde las propiedades (guardados en el backend).
- Panel **Dashboard** solo accesible para el **administrador autenticado**.
- Gestión de propiedades desde el panel (crear, editar, eliminar).
- Subida de imágenes directamente a Cloudinary desde el frontend.

---

## 🔐 Autenticación
El proyecto utiliza **JWT (JSON Web Token)**.  
Solo los usuarios autenticados con rol de **admin** pueden acceder al Dashboard para realizar operaciones CRUD sobre propiedades o mensajes.

---

## ☁️ Cloudinary
Las imágenes de las propiedades se almacenan en Cloudinary.  
Cada imagen subida desde el Dashboard genera una URL pública que se asocia a la propiedad correspondiente en la base de datos.

---

## 💬 Sistema de mensajes
Los visitantes pueden enviar un mensaje de contacto desde el detalle de una propiedad.  
Estos mensajes se guardan en el backend y son visibles desde el Dashboard del admin.

---

## 🧠 Lógica del flujo
1. El usuario (visitante) navega por las propiedades.
2. Si está interesado, envía un mensaje de contacto.
3. El mensaje se guarda en la base de datos y se puede ver desde el Dashboard.
4. El administrador puede:
   - Crear, editar y eliminar propiedades.
   - Ver los mensajes recibidos.
   - Subir imágenes a Cloudinary.

---

## 🧑‍💻 Autor
**Nicolás Laime**  
Desarrollador Full Stack — Proyecto Inmobiliaria SPA  
💼 *Stack:* Java | Spring Boot | React | Tailwind | MySQL | Cloudinary

---

## 🛠️ Posibles mejoras futuras
- Filtros de búsqueda avanzada (precio, ubicación, tipo de propiedad).
- Panel de estadísticas de visitas y contactos.
- Notificaciones por correo al recibir mensajes.
- Soporte multiusuario (más de un admin).

---

📌 *Proyecto Full Stack — CRUD completo con autenticación y gestión de archivos en la nube.*

![ver-propiedades](https://github.com/user-attachments/assets/6cf13f80-ee5f-4681-b68f-3ea9997843a2)

![crear-propiedades](https://github.com/user-attachments/assets/616cf5ad-713a-4d3f-84e1-143eb1a4c256)

![crud-mensajes](https://github.com/user-attachments/assets/3eac6f1d-ad6f-47af-941f-c5314bf81d91)

