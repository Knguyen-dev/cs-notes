package com.knguyen.colors;

import com.knguyen.colors.interfaces.ColorPrinter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


/**
 * This is a spring boot command-line application
 *
 */
@SpringBootApplication
public class ColorsApp  implements CommandLineRunner {
    private final ColorPrinter colorPrinter;

    /**
     * + When our app runs:
     * 1. So when the app runs, it looks for the configuration files. It's going to find the PrinterConfig and create the
     *    beans for RedPrinter, BluePrinter, and GreenPrinter and puts those in its 'context'. When it finds the ColorPrinter bean it sees that it needs RedPrinter, GreenPrinter, and BluePrinter. It already has those beans and implementations
     *    in its context, so it uses those to create that ColorPrinter bean.
     *
     * - NOTE: The ColorPrinter bean, we're saying yes "ColorPrinterImpl is a bean or implementation of the interface ColorPrinter that
     *         should be stored in Spring's context, so that we can inject and use it later.
     *
     * 2. Now in our ColorsApp class, we have a constructor that accepts a ColorPrinter and assigns that to our colorPrinter field.
     *    Our Spring framework will actually call this constructor for us, and since it has a 'ColorPrinter' bean, it will
     *    pass that bean in as an argument. As a result, we've successfully created a bean for ColorPrinter and let the
     *    Spring framework 'inject' or provide it to our ColorApp.
     *
     * + Adding spanish versions:
     * 1. Go to your printer configuration file. Update the beans for RedPrinter, BluePrinter, and GreenPrinter. This time we'll return an implementation
     *    that prints it out in Spanish. Now when the app runs those 'Spanish' printer beans are creatd in context (they're the only things that changed), then our
     *    ColorPrinter bean is created. Finally our ColorsApp constructor is called with the ColorPrinter from context (a dependency injection). And now our
     *    app prints colors in Spanish.
     *
     * + Review of how we did things
     * 1. We created our interfaces (RedPrinter, BluePrinter, GreenPrinter, and ColorPrinter). Then we created implementations of those interfaces.
     *    English and Spanish red printer, blue printer, etc. Our ColorPrinter, which is the class that relies on dependencies is going to be passed
     *    in those concrete implementations.
     * 2. We created a PrinterConfig file, that will create beans and implementations of our interfaces. For example, the bean for 'RedPrinter'
     *    can be an EnglishRedPrinter or SpanishRedPrinter. This highlights the specialty of a config file or class, as it lets us decide what dependencies
     *    we want. Anyways we create the beans for the separate printers and then that's used to dependency inject and create the bean for the ColorPrinter. Great
     *    now we have an implementation/concrete class or instance/bean of the ColorPrinter interface in our Spring Context.
     *
     * However using a config file is only one way of creating beans. So now we're going to exlude this directory and look at the @Components
     * and friends way of doing things. So once we exclude this directory, our application should break.
     *
     * "Parameter 0 of constructor in com.knguyen.colors.ColorsApp required a bean of type 'com.knguyen.colors.interfaces.ColorPrinter' that could not be found."
     *
     * It's saying that it's looking for a bean/concrete class implementation of the interface ColorPrinter in
     * Spring's context, but that wasn't found.
     *
     */
    public ColorsApp(ColorPrinter colorPrinter) {
        this.colorPrinter = colorPrinter;
    }

    public static void main(String[] args) {
        SpringApplication.run(ColorsApp.class, args);}

    @Override
    public void run (final String... args) {
        // Create a color print that aligns with the ColorPrinter interface
        String color = colorPrinter.print();
        System.out.println("Color we got: " + color);
    }
}
