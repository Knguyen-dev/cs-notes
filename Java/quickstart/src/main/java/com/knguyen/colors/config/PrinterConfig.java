package com.knguyen.colors.config;
import com.knguyen.colors.impl.*;

import com.knguyen.colors.interfaces.ColorPrinter;
import com.knguyen.colors.interfaces.RedPrinter;
import com.knguyen.colors.interfaces.GreenPrinter;
import com.knguyen.colors.interfaces.BluePrinter;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PrinterConfig {


    /**
     * 1. The EnglishBluePrinter should be a bean, an object managed/provided by an outside framework. So this
     * method will return an implementation of BluePrinter. It could be an EnglishBluePrinter that it returns.
     * And we'll do this for the rest of the printers.
     *
     * 2. Now that these are 'beans', these are available in our Spring 'Context' and they can be injected where they're
     * needed.
     *
     * + Spanish Printer
     * Our PrinterConfig file, is our configuration file. This is where we can plug in and plug out our
     * various dependencies. So for bluePrinter you can decide whether or not you want it to return EnglishRedPrinter
     * or SpanishRedPrinter. Then it creates the beans, and that's all you need to change. Changing the BluePrinter, RedPrinter, and
     * GreenPrinter implementations or beans, shouldn't change the ColorPrinter bean.
     *
     */
    @Bean
    public BluePrinter bluePrinter() {


        // return new EnglishBluePrinter();
        return new SpanishBluePrinter();
    }

    @Bean
    public RedPrinter redPrinter() {
        // return new EnglishRedPrinter();
        return new SpanishRedPrinter();
    }

    @Bean
    public GreenPrinter greenPrinter() {
        // return new EnglishGreenPrinter();
        return new SpanishGreenPrinter();
    }

    /**
     * The ColorPrinter for our app should be a bean as well. There's an interface, and also there's many ways it can be implemented depending on the
     * dependencies.
     */
    @Bean
    public ColorPrinter colorPrinter(RedPrinter redPrinter, GreenPrinter greenPrinter, BluePrinter bluePrinter) {
        return new ColorPrinterImpl(redPrinter, greenPrinter, bluePrinter);
    }




}
