# Etapa de construcción: Compilar el proyecto con Maven
FROM maven:latest AS build
WORKDIR /app

# Copia el archivo pom.xml y el código fuente
COPY pom.xml .
COPY src ./src

# Ejecuta Maven para compilar el proyecto y generar el JAR
RUN mvn clean package -DskipTests

# Etapa de ejecución: Usar solo el JAR generado
FROM openjdk:21-jdk-slim
WORKDIR /app

# Copia el JAR con el nombre correcto
COPY --from=build /app/target/agrotrace-0.0.1-SNAPSHOT.jar app.jar

# Expón el puerto
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
