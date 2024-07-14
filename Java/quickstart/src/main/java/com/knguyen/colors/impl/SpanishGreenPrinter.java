package com.knguyen.colors.impl;

import com.knguyen.colors.interfaces.GreenPrinter;
import org.springframework.stereotype.Component;


@Component
public class SpanishGreenPrinter implements GreenPrinter {
    public String print() {
        return "verde";
    }
}
