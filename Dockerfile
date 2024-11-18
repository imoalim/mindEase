# Wähle das Base Image
FROM openjdk:17-jdk-slim

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die JAR-Datei in das Arbeitsverzeichnis
COPY target/mindEase-0.0.1-SNAPSHOT.jar app.jar

# Definiere den Befehl, um die Anwendung auszuführen
ENTRYPOINT ["java", "-jar", "app.jar"]