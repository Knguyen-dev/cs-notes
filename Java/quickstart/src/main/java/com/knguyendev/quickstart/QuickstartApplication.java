package com.knguyendev.quickstart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * This class is essentially the entrypoint to our application.
 *
 * The annotation '@SpringBootApplication' essentially just identifies our
 * SpringBoot application, and again acts as our entrypoint, where everything begins.
 *
 */
@SpringBootApplication
public class QuickstartApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuickstartApplication.class, args);
	}

}
