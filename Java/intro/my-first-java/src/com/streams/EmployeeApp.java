package com.streams;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class EmployeeApp {
    static List<Employee> employees = new ArrayList<>();
    static {
        employees.add(
                new Employee("John", "Dane", 5000.0, List.of("Project 1", "Project 2"))
        );
        employees.add(
                new Employee("James", "Dane", 6000.0, List.of("Project 2", "Project 3"))
        );
        employees.add(
                new Employee("Gerald", "Dane", 7000.0, List.of("Project 3", "Project 4"))
        );
    }

    public static void main(String[] args) {

        List<Employee> newEmployees = employees.stream()
                .map(e -> new Employee(
                        e.getFirstName(),
                        e.getLastName(),
                        e.getSalary() * 1.10,
                        e.getProjects()
                )).toList();


        // be a chance there's no employee with a salary > 5000;
        String employeeNames = employees.stream()
                .filter(e -> e.getSalary() > 5000)
                .map(e -> e.getFirstName())

                // 'Optional' just means it may not exist; meaning we may not be returned anything from findFirst, which makes sense in this context as there could
                .findFirst()

                // If there wasn't an Employee name, we'll return null
                .orElse(null);


        /*
         * 'flatMap': Used to transform each element of a stream into another stream. After we do this we
         * 'flatten' the resulting streams into a single stream. So all of those iterables-like objects
         * are now in one iterable-like object.
         *
         * 1. Create stream of employee objects.
         * 2. Each employee object is now a list of projects. We now have a stream of 'List<String>'
         * 3. Each List<String> is  converted into a stream of containing its elements. So instead of
         *    Stream<List<String>>, it's a Stream<String>; Of course in cases where it's nested more levels
         *    deep, simply use another flatMap operation for the next layer, etc.
         * 4. Collects the flattened together into a single string.
         *
         *
         */
        String projects = employees.stream()
                .map(e -> e.getProjects())
                .flatMap(projectsList -> projectsList.stream())
                .collect(Collectors.joining(","));

        /*
         * 1. Skip the first element in the stream
         * 2. Limit to only 1 element. So in this case we essentially get
         *    the second employee only.
         *
         */
        List<Employee> shortCircuit = employees.stream().skip(1).limit(1).toList();

        /*
         * Finite data: Essentially using Stream.generate can produce an infinite stream of values, or as many as you want.
         * Here we're limiting that to the first 5 values we get, and print out those values
         *
         */
        Stream.generate(Math::random)
                .limit(5)
                .forEach(value -> System.out.println(value));

        /*
         * A review on sorting. Here we're sorting based on the first name of the employees
         *
         * - We sort the stream using a comparator, which here compares two strings lexicographically.
         * So we'll get our employees back in alphabetical order.
         */
        List<Employee> sortedEmployees = employees.stream()
                .sorted((e1, e2) -> e1.getFirstName().compareToIgnoreCase(e2.getFirstName()))
                .toList();

        // Get the minimum value!
        Double maxSalary = employees.stream().max(Comparator.comparing(Employee::getSalary))
                // Just in case that element or value doesn't exist we can throw an error
                .orElseThrow(NoSuchElementException::new).getSalary();


        /*
         * Reducing in Java and doing an accumulator pattern.
         *
         * 1. Now get a stream of doubles.
         * 2. Then start with 0, and reduce those doubles.
         *
         * - How reduce works:
         * 1. The initial value is set at 0, and this is accumulated over time. Then it's returned when the stream is
         *    empty and all is well and done.
         * 2. The 'Double::sum' is a binary operator that takes two elements and combines them into a single result.
         *    So just know it's combining the sum and then the current stream element.
         */
        Double totalSalary =
                employees.stream().map(e -> e.getSalary()).reduce(0.0, Double::sum);


        /*
         * Parallel streams: Basically your program doesn't have to wait until the stream is finished
         * executing to move on the the next code
         * So instead of doing .stream() do .parallelStream()
         */





    }
}
