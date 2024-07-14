package com.knguyen.postgresSQL.config;

import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

public class DatabaseConfig {


    // Create bean for JdbcTemplate type, so this implementation is available inside Spring context; ready to be injected
    // Into things such as our production and our tests
    @Bean
    public JdbcTemplate jdbcTemplate(final DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
}
