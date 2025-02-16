# Implementación del Patrón State

## Descripción del Patrón
El patrón **State** es utilizado para **permitir que un objeto altere su comportamiento cuando su estado interno cambia**.  
Este proyecto demuestra su implementación mediante un ejemplo práctico en **Javascript**, utilizando **npm** como gestor de dependencias.

## Estructura del Proyecto
La estructura del proyecto sigue el estándar de **npm**:
Statepatterh
│
├── pom.xml                # Archivo de configuración de Maven
├── README.md              # Documentación del proyecto
└── src
    ├── main
    │   ├── java
    │   │   └── [paquete base]    # Código fuente principal
    │   └── resources             # Recursos adicionales
    └── test
        └── java                  # Pruebas unitarias

## Dependencias Utilizadas
Este proyecto utiliza las siguientes dependencias definidas en el archivo `pom.xml`:

```xml
<dependencies>
    <!-- Dependencias estándar de Maven -->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```
## Instrucciones de Instalación
Clonar el repositorio:

git clone https://github.com/usuario/nombre_repositorio.git

O copiar el siguiente despliegue en Postman y añadir el siguiente JSON:
```xml
{
  "sourceAccount": "123456789",
  "destinationAccount": "987654321",
  "accountType": "savings",
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
 
  "transactions": {
    "transactionId": "TXN123456",
    "sourceAccount": "123456789",
    "destinationAccount": "987654321",
    "accountType": "savings",
    "amount": 100.50,
    "status": "approved",
    "time": "18:00",
    "Date": "16-02-2025"
  }
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



