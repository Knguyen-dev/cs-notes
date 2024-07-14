package com.knguyen.colors.impl;
import com.knguyen.colors.interfaces.BluePrinter;
import com.knguyen.colors.interfaces.GreenPrinter;
import com.knguyen.colors.interfaces.RedPrinter;
import com.knguyen.colors.interfaces.ColorPrinter;
import org.springframework.stereotype.Component;

/**
 * ColorPrinterImpl is our Main class. Its dependencies are RedPrinter, BluePrinter, and GreenPrinter. So here we did the
 * dependency injection method, where our main class will contain the interfaces of its dependencies (RedPrinter, BluePrinter, etc.)
 * and then we let Spring inject those concrete classes (EnglishRedPrinter, etc.).
 *
 * - ISSUE: But now let's say we want to print out the colors in Spanish. To do this, we'd need to make changes to our ColorPrinterImpl
 *          class, even though we kind of just want to swap the dependencies it uses, which are the concrete classes for red, blue, and greenPrinter.
 *
 * - SOLUTION: Let's use beans. First our ColorPrinter and ColorPrinterImpl, that's a great candidate for a bean, as we have an interface and then
 *             a concrete class that's provided for that interface. Then we have oru red, blue, and greenPrinter alongside their implementations.
 *             Those can also be created as beans, as we have our interfaces, and the concrete dependencies/classes that we plan to inject.
 *             So how do we create these beans? Create a configuration file or class.
 *
 * 1. Create a package 'config' with PrinterConfig Class. Our PrinterConfig is where we create our beans for RedPrinter, BluePrinter, and GreenPrinter.
 *
 *
 * + Component and friend annotations:
 *
 *
 * This '@Component' tells Spring that 'ColorPrinterImpl' is a bean, an implementation of ColorPrinter that should be put inside
 * Spring's context. It also says that any dependencies that this class requires (RedPrinter, BluePrinter, and GreenPrinter) should be injected as well.
 * So now Spring will look for beans for those interfaces. To provide those beans, just put '@Component' on the implementations
 * that you want.
 *
 */

@Component
public class ColorPrinterImpl implements ColorPrinter {
    private final RedPrinter redPrinter;
    private final BluePrinter bluePrinter;
    private final GreenPrinter greenPrinter;

    /*
    Here we are instantiating or creating the dependencies inside our class. However, if we want to swap our dependencies, such as printing out
    our colors in Spanish, then we'd need to change our ColorPrinterImpl class itself, and make it, so we use new SpanishRedPrinter or something
    like that. That's not only bad, but it makes our code messy, we'd need to create separate classes for printing in english and spanish. So
    let's see a different constructor.
    */
    // Public ColorPrinterImpl() {
    //    this.redPrinter = new EnglishRedPrinter();
    //    this.greenPrinter = new EnglishGreenPrinter();
    //    this.bluePrinter = new EnglishBluePrinter();
    // }

    /**
     * 2.
     * Instead, we are passing the implementations of our printers. Our printers are beans now, as we've created those
     * beans in our PrinterConfig class, and that just allows the concrete implementations to be stored and managed by the Spring framework.
     *
     * Now we should be able to pass in these concrete printer classes to our ColorPrinterImpl whenever we want.
     *
     */
     public ColorPrinterImpl(RedPrinter redPrinter, GreenPrinter greenPrinter, BluePrinter bluePrinter) {
         this.redPrinter = redPrinter;
         this.greenPrinter = greenPrinter;
         this.bluePrinter = bluePrinter;
     }

    @Override
    public String print() {
        return String.join(", ", redPrinter.print(), bluePrinter.print(), greenPrinter.print());
    }

    // Remember to implement the print method to align with the interface
    public static interface ColorPrinter {
        String print();
    }
}
