package com.knguyen.colors.impl;

import com.knguyen.colors.interfaces.RedPrinter;
import org.springframework.stereotype.Component;


@Component
public class EnglishRedPrinter implements RedPrinter {
    public String print() {
        return "red";
    }
}
