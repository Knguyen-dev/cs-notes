package com.knguyen.database.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

    /**
     * Create a bean for the Model mapper. The thing that's going to
     * map our 'entities' (persistence-layer and service layer objects) and our '
     * 'DTOs' (our presentation layer objects);
     */
    @Bean
    public ModelMapper modelMapper() {



        ModelMapper modelMapper = new ModelMapper();

        /*
         * + Allow for nested objects:
         * Basically when you have a nested object in our DTO, for example a nested author DTO in our book DTO, then
         * when Spring convert sour BookDto into a book entity, then it will attempt to convert that nested author dto (object)
         * into an author entity as well. And this allows for the cascading when saving and whatnot.
         *
         */
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper;
    }
}
