package com.apiproyectodaw.apiproyectodaw;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.apiproyectodaw.apiproyectodaw.config.FileStorageProperties;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableConfigurationProperties({
    FileStorageProperties.class
})
public class ApiproyectodawApplication {

	public static void main(String[] args) {

		// Cargar .env
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        // Inyectar al sistema
        System.setProperty("JDBC_DATABASE_URL", dotenv.get("JDBC_DATABASE_URL"));
        System.setProperty("DB_USER", dotenv.get("DB_USER"));
        System.setProperty("DB_PASS", dotenv.get("DB_PASS"));

		SpringApplication.run(ApiproyectodawApplication.class, args);
	}

}
