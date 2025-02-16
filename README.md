# Implementación del Patrón State

## Descripción del Patrón
El patrón **State** es utilizado para **permitir que un objeto altere su comportamiento cuando su estado interno cambia**.  
Este proyecto demuestra su implementación mediante un ejemplo práctico en **Javascript**, utilizando **npm** como gestor de dependencias.

## Estructura del Proyecto
La estructura del proyecto sigue el estándar de **npm**:

📂 StatePattern/

│

├── 📄 .gitignore                 → Ignorar archivos innecesarios  
├── 📄 README.md                  → Documentación del proyecto  
├── 📄 package.json               → Configuración de npm  
├── 📄 package-lock.json          → Archivo de dependencias npm  
├── 📄 vercel.json                → Configuración para despliegue en Vercel  

│  

├── 📂 src/                       → Carpeta principal del código fuente  

│   ├── 📂 models/                → Clases del Patrón State  
│   │  
│   │   ├── 📄 TransactionContext.js  → Contexto de la transacción  
│   │   ├── 📄 TransactionState.js    → Clase abstracta  
│   │   ├── 📄 PendingState.js        → Estado "En Curso"  
│   │   ├── 📄 ApprovedState.js       → Estado "Aprobada"  
│   │   ├── 📄 RejectedState.js       → Estado "Rechazada"  
│  

│   ├── 📂 routes/                → Rutas de la API  
│   │  
│   │   ├── 📄 transactionRoutes.js   → Rutas para transacciones  
│  

│   ├── 📂 data/                  → Base de datos simulada  
│   │  
│   │   ├── 📄 accounts.json       → Información de cuentas bancarias  
│  

│   ├── 📄 index.js               → Servidor principal con Express  


## Dependencias Utilizadas
Este proyecto utiliza las siguientes dependencias definidas en el archivo `package.json`:

```xml
"dependencies": {
  "express": "^4.18.2",     
  "cors": "^2.8.5" 
}

```
## Instrucciones de Instalación
Clonar el repositorio:

git clone https://github.com/usuario/nombre_repositorio.git

O copiar el siguiente despliegue en Postman y añadir el siguiente JSON:
```xml
{
  "sourceAccount": 123456789,
  "destinationAccount": 987654321,
  "accountType": "ahorro",
  "amount": 100.50
}

```
Ejecutar el proyecto:

Ejemplo de Ejecución
Al ejecutar el programa, deberías ver la siguiente salida, si haces una solicitud POST:
```xml
{
  "message": "Transaction created successfully",
}
```
Al ejecutar el programa, deberías ver algo como la siguiente salida, si haces una solicitud GET:
```xml
{
    "transactions": [
        {
            "transactionId": "TXN1739728305673",
            "sourceAccount": 1627271722,
            "destinationAccount": 999999,
            "accountType": "ahorro",
            "amount": 10000,
            "status": "inprogress",
            "time": "12:51:45 p. m.",
            "date": "16/2/2025"
        }
    ]
}
```
Si deseas ver una interfaz visual del banco dirigete al siguiente despliegue:

link-despliegue-front

## Diagrama UML
El siguiente diagrama muestra la estructura del patrón implementado:

Diagrama UML

## Explicación de la Implementación
El patrón [State] ha sido implementado utilizando las siguientes clases principales: - [Clase 1]: Explicación del propósito de la clase. - [Clase 2]: Explicación del propósito de la clase. - [Clase 3]: Explicación del propósito de la clase.

## Contribuciones
Este proyecto fue desarrollado por: - **Andrea Julieth Sosa Rodriguez** -**Samuel Andres Rodriguez Ulloa** -**David Santiago Medina Buitrago**



