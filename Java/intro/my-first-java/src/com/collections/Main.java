package com.collections;

import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;

/**
 * + Collections framework
 * Production grade implementations for widely known data-structures. Data-structures
 * are linkedlists, array, trees, etc. The collections framework has interfaces, abstract classes,
 * and then concrete/regular classes.
 *
 *
 * - ArrayList: It's a dynamic array, so you can have a flexible amount of items.
 *              1. Good for random access
 *              2. In areas when there's not a lot of removals is good. When deleting it's O(n)
 *              as it worse case, you'd shift all elements to a new position.
 * - LinkedList: Items are stored in nodes, with references to previous and next.
 *               1. Shines in insertions with O(1), just have to change the references
 *               2. Sucks at random access O(n).
 *
 * - PriorityQueue: Acts as a queue, but elements are sorted based on their 'values' or priority.
 *                  So the higher the priority, the earlier an object is going to be processed.
 *                  O(logn)
 *
 * - HashMap: Essentially a dictionary. However the keys and values are unsorted and there's no
 *            order to it.
 *
 *  - Set: Similar to a list, but doesn't allow duplicate elements. If you try to add a duplicate elmeent
 *         then it'll be removed.
 *
 * - NOTE: Multiple of these collections are not thread-safe. Meaning that if you're running multiple
 * threads and they're accessing/updating this object, then you may get unpredictable results. A workaround
 * this is obviously using the 'synchronized' keyword/block or using the collection class's own synchronized* versions of the classes.
 *
 * + Credits:
 * 1. https://www.youtube.com/watch?v=viTHc_4XfCA
 */

public class Main {

    public static void main() {

    }

    public static void ex1() {

        LinkedList<Integer> list = new LinkedList<>();
        list.add(1);

        // You can also use queue and stack operations on it
        list.offer(2);
        list.poll();

        // NOTE: Type 'Object' is just the base class for all classes in java
        // Basically you're saying it's a set of any type of the same class.
        Set<Object> set = Collections.synchronizedSet(new HashSet<>());

    }
}
