package com.knguyen.database.mappers.impl;

import com.knguyen.database.domain.dto.AuthorDto;
import com.knguyen.database.domain.entities.AuthorEntity;
import com.knguyen.database.mappers.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class AuthorMapperImpl implements Mapper<AuthorEntity, AuthorDto> {

    private ModelMapper modelMapper;

    /**
     * We want to separate the implementations of the layers. Essentially our service and persistence layer should be
     * dealing with the 'AuthorEntity' class instances. When our controllers call a service function, they'll get back an AuthorEntity,
     * so we'll use a mapper to convert that into a AuthorDto, and vice versa.
     *
     */

    public AuthorMapperImpl(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Override
    public AuthorDto mapTo(AuthorEntity authorEntity) {
        return modelMapper.map(authorEntity, AuthorDto.class);
    }

    @Override
    public AuthorEntity mapFrom(AuthorDto authorDto) {
        return modelMapper.map(authorDto, AuthorEntity.class);
    }
}
