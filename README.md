Gestión de Eventos - React Frontend
     Descripción del Proyecto
Este es un proyecto de gestión de eventos desarrollado en React utilizando Vite como herramienta de desarrollo. Permite a los usuarios:

Crear eventos: Añadir nuevos eventos proporcionando detalles como título, descripción, ubicación, fecha, hora, y más.
Editar eventos: Modificar la información de eventos existentes.
Listar eventos: Ver una tabla con los eventos creados, incluyendo detalles del organizador.
Eliminar eventos: Eliminar eventos existentes con confirmación.
El frontend está conectado a una API REST desplegada en Vercel, que realiza las operaciones CRUD sobre los eventos.

    Características Principales
Crear y editar eventos con formularios dinámicos y validaciones.
Confirmaciones al salir sin guardar cambios.
Listar y eliminar eventos con notificaciones.
UI responsiva utilizando Material UI.

    Tecnologías Utilizadas
Frontend:
React
Vite
Material UI
Axios
React Router DOM
Backend (API):
La API REST está desplegada en Vercel y realiza las operaciones CRUD sobre eventos.
URL de la API: https://api-crud-mongoatlas.vercel.app/
📂 Estructura del Proyecto
plaintext
Copy code
src/
├── components/        # Componentes reutilizables
├── pages/             # Páginas principales (Home, Create, Edit)
├── theme/             # Tema personalizado de Material UI
├── App.jsx            # Archivo principal de la aplicación
├── main.jsx           # Punto de entrada del proyecto
 Pasos para Clonar y Ejecutar el Proyecto
Clona este repositorio:

bash
Copy code
git clone https://github.com/tu-usuario/nombre-del-repositorio.git
cd nombre-del-repositorio
Instala las dependencias necesarias: Asegúrate de tener Node.js instalado. Luego, ejecuta:

bash
Copy code
npm install

Inicia el servidor de desarrollo:

bash
Copy code
npm run dev
Esto iniciará la aplicación en modo desarrollo. Abre tu navegador y navega a http://localhost:5173.

🌐 Conexión con la API
El frontend se conecta a una API REST desplegada en Vercel. La API gestiona los eventos y proporciona las siguientes rutas:

GET /eventos: Obtener todos los eventos.
GET /eventos/:id: Obtener un evento por su ID.
POST /eventos: Crear un nuevo evento.
PUT /eventos/:id: Actualizar un evento existente.
DELETE /eventos/:id: Eliminar un evento.
URL base de la API:
https://api-crud-mongoatlas.vercel.app/

🧪 Pruebas del Proyecto
Crear un Evento:

Navega a /crear-evento.
Completa el formulario y haz clic en "Crear Evento".
Editar un Evento:

Navega a /editar-evento/:id con el ID del evento deseado.
Edita los datos y haz clic en "Editar Evento".
Eliminar un Evento:

Desde la tabla en la página principal, selecciona un evento y haz clic en "Eliminar Evento".
Confirma la eliminación.
