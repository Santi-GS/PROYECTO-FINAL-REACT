Gestión de Eventos - React Frontend

DESCRIPCIÓN DEL PROYECTO
     
Este es un proyecto de gestión de eventos desarrollado en React utilizando Vite como herramienta de desarrollo. 

Permite a los usuarios:

Crear eventos: Añadir nuevos eventos proporcionando detalles como título, descripción, ubicación, fecha, hora, y más.

Listar eventos: Ver una tabla con los eventos creados, incluyendo detalles del organizador.

Filtrar eventos por nombre y titulo.

Si entramos en modo ADMINISTRADOR podemos:

Editar eventos: Modificar la información de eventos existentes.

Eliminar eventos: Eliminar eventos existentes con confirmación.



LOGIN: 

--usuario: admin10 

--Contraseña: 12345


El frontend está conectado a una API REST desplegada en Vercel, que realiza las operaciones CRUD sobre los eventos.

https://github.com/Santi-GS/API-CRUD-mongoatlas.git

Características principales

Crear y editar eventos con formularios dinámicos y validaciones.

Confirmaciones al salir sin guardar cambios.

Listar y eliminar eventos con notificaciones.

UI responsiva utilizando Material UI.

Tecnologías utilizadas

Frontend:

-React
-Vite
-Material UI
-Axios
-React Router DOM


Backend (API):
La API REST está desplegada en Vercel y realiza las operaciones CRUD sobre eventos.

GET /eventos: Obtener todos los eventos.

GET /eventos/:id: Obtener un evento por su ID.

POST /eventos: Crear un nuevo evento.

PUT /eventos/:id: Actualizar un evento existente.

DELETE /eventos/:id: Eliminar un evento.

Endpoint de negocio que permite buscar por nombre del organizador y titulo de eventos.

URL base de la API:
https://api-crud-mongoatlas.vercel.app/

Para clonar este repositorio:

Abrir una terminal

Copy code:
git clone https://github.com/Santi-GS/PROYECTO-FINAL-REACT.git

Instala las dependencias necesarias: Asegúrate de tener Node.js instalado. Luego, ejecuta:

npm install

Inicia el servidor de desarrollo:

npm run dev

Esto iniciará la aplicación en modo desarrollo. Abre tu navegador y navega a http://localhost:5173.

![image](https://github.com/user-attachments/assets/b7b9e048-76bf-430f-91df-20b7de93fddc)

![image](https://github.com/user-attachments/assets/47895e0e-70bb-4844-af59-a6c71caa4323)

![image](https://github.com/user-attachments/assets/3f84d4c0-da9c-456d-95ae-82e23f13d464)



   
