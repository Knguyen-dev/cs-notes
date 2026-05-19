# Data Oriented Design and C++

A 60 FPS game only allows 16.67 ms per frame; 30 FPS allows 33.33 ms. A modern engine is running physics, AI, rendering, etc. all within this window. If AI logic takes 2 ms, that's 12% of your entire frame budget. Optimizations must happen at the microsecond level because hundreds of engine subsystems must share this tiny window.

Whilst most of the work is done in C++, the ogal is to write code that generates highly predictable and optimal ASM. For example:
- **Compiler Explorers**: Tools used to look at the C++ code side-by-sdie with teh generated ASM to ensure the compiler is optimizing correctly.
- **Intrinsics:** Special C/C++ functions that map directly to specific CPU ASM instructions like SIMD/vectorization instructions wtihout needing to write raw ASM.
- **Profilers (like VTune or Telemetry):** Tools that show exactly which lines of ASM are causing cache misses or CPU stalls.

## Game Dev Performance vs Mars Roveer 

### Exceptions: Why they're turned off
In standard C++, when something goes wrong, we throw an exception and catch it somewhere. Performance engineeres completely disable this feature at the compiler level (`-fno-expcetions`). Here's the issue:
- **Hidden Costs:** To support exceptions, the compiler generates a massive amount of hidden code and "unwind tables". If an exception is thrown, hte CPU has to stop what it's' doing, look at these tables, and figure out how to clean up memory as it backs out of functions.
- **Unpredictability:** Even if an exception is never thrown, simply having them forces the compiler to generate less optimized machine code. It can't make certain assumptions because an exception might abruptly exit the function at any moment.
- **Determinism:** Execution times in real time systems must be deterministic, and exceptions introduce a chaotic element. Performance engineers prefer returning simple error codes or checking assertions.

### C++ Templates: Compile-Time Slow Downs
Templates allow us to write generic code. Instead of writing separate list functions for integers, flaots, and characters, we can write one `List<T>` template function. The issue is that templates use a mechanism called code generation (monomorphization). When the compiler compiles our code, it replaces every `T` with every single type we actually use. If you have `List<int>` `List<float>`, and `List<Enemy>`, the compiler creates 3 different functions behind the scenes to support those operations.
- **Why this cripples compile times:** If a template is included in a header file that's used by 200 different code files, the compiler has to parse and regenerate that template multiple times. A 10 second compile could turn int oa 20 minute compile.
- **Performance Degradation (Code Bloat):** All those duplicated functions mkae our final executable large. Modern CPUs rely on the Icache a lot. If code bloat makes the executable too bit, it's not going to fit in ICache. THe CPU would have to constantly stall and wait to fetch code from RAM.

### IOstream vs stdout: Why avoid `std::iostream`?
In C++, it's typical to use `std::cout` (iostream), but Mike Acton prefres C-style `printf` or writing directly to `stdout`. The C++ `<iostream>` library is notoriously bloated:
- Including `<iostream>` drags in thousands of lines of heavy, OOP code, increasing compile times.
- Internally, `std::cout` has a lot of logic. It tracks state, dynamically allocates memory, and synchronizes with C's I/O systems.
- For a performance engineer, `std::cout` is a lot for outputting text. Writing directly to `stdout` via `printf` lean, fast, and doesn't bring many unwanted dependencies.

### Multiple Inheritance
Remember that single inheritance could be `Vampire` is a type of `Enemy`. Whilst multiple inheritance is `Vampire` is a type of `Enemy` and it's a type of `FlyingCreature` simultaneously. It's useful, but can introduce issues such as the **Diamond Problem**. If both `Enemy` and `FlyingCreature` inherit from a base class `GameObject` with a `health` attribute, then `Vampire` now inherits two separate copies of `health`. The CPU doesn't know which one we're referring to.

From a hardware perspective, multiple inheritance ruins memory layout. To make multiple inheritance work, a compiler has to inject hidden pointers (called vtables) and constantly adjust memory addresses whenever we try to read data from the object. This scatters data across RAM and forces the CPU to "chase pointers" to find variables, causing massive cache misses. 

### Operator Overloading: Minimized
Engineers often get carried array. For example, overloading the multiplication operator to blend two complex textures together, or overloading the `|` operator to reset an enemy's AI state. This hides work. When we see `A+B`, it looks like a cheap one-cycle CPU instruction. But in reality an overloaded operation may do something really expensive. In general, write code that looks like what the hardware is actaully doing.

### Runtime Type Information (RTTI): Banned

**What is RTTI?**
In C++, if you have a base class pointer (like `Enemy*`), you might not know at runtime if it's pointing to a `Zombie`, `Vampire`, or a `Boss`. RTTI is the language feature that lets the program figure out an object's exact type at runtime. Commonly, we use RTTI with the `dynamic_cast` command:
```cpp
// Checking if this generic enemy is actually a Vampire
Vampire* v = dynamic_cast<Vampire*>(someEnemyPtr);
if (v) {
    v->fly();
}
```
There are several reasons why this is banned in performance work:
- **Very Slow:** To determine the type at runtime, `dynamic_cast` looks up the object's internal tracking data, traverses a tree of class structures, and comapres string names of classes behind the scenes. A lot of stuff, non-deterministic latency, and therefore degrades performance.
- **Architectural Faults:** In Data Oriented Design, we should alreayd know what type of data we're processing. Instead of having a mixed bag of random `Enemy*` and deducing the type of each one, simply keep all `Vampire` instsnaces in one contiguous array and all `Zombie` instsances in another. Then you'd loop through both arrays, which promotes branch prediction and instruction cache locality.

### No Standard Library (STL)
The STL (Standard Template Library) provides built-in tools like `std::vector`, `std::map`, etc. for us. These are great for general purpose programs. However, performance engineers prefer: predictable memory layouts, zero hidden allocations, and fast compile times. STL fails at all three.
- **Hidden/Unpredictable Allocations:** Consider `std::vector`. When you add an item to a vector using `.push_back()`, it grows automatically. But if it runs out of space, the vector will ask for a larger heap chunk, copy our elements over to it, and release the old heap chunk. 
- **Bad Locality:** Containers like `std::map` or `std::list` are node based. They scatter individual items all over RAM, connecting them with pointers (linked list). When the CPU reads these data strucutres, it'll suffer cache misses because the data isn't sitting neatly next to each other.
- **Bloat and Compilation:** Including `<map>` or `<vector>` forces the compiler to parse tens of thousands of lines of heavy template code, which degrades compilation times.

### Custom Allocators: Linear/Arena Allocators
When we use `new` or `malloc`, we ask the OS to find a chunk of heap memory for our data. However, using dynamic memory also slowly causes memory fragmentation. Eventually we can't find a single contiguous block big enough for a new object and our game would soon crash.

Instead of asking the OS for tiny heap blocks thousands of times a second, the game engine asks the OS for a massive block of memory when the game starts (e.g., 8 GB). Then the engine now owns this entire "sandbox". Then we use a Linear/Arena Allocator to manage this sandbox:
- How it Works: Imagine a giant blank notebook. When we need memory for an object, we write it on page 1. The next object on page 2, and so on. We're moving a pointer forward, which is minimal CPU cycles and results in zero fragmentation.
- Linear Burn Through and Reset: You cannot delete/release individual objects in the linear allocator. You can only use memory, move forward, and then wipe the entire notebook clean at once.

## Data Oriented Design Principles
- Latency and throughput are only the same in sequential systems.
- When there is one, there are many. Imagine multiple items on the time axis.
- None Uniform Memory Access (NUMA) extends to I/O and prebuilt data all the way back through time to original source creation. Hard disk, to the blue ray, to the deveoment pc, to the source data, to the original artist with the mouse. This stream of input over time and we have to manage that entire pipeline over time.

## Why are we talking about this?
There are three big lies:

**Software is a Platformm:**
Hardware is a the platform. Different hardware calls for diferent solutions.Different physical constraints apply, you can't make a solution indepnedent of the platforms you're owrking for.

Don't be worried if the way you're optimizing your code is literally writing code that's specific to your hardware constraints. If it's less clean that's fine.

**Code should Model the world (OOP)**
OOP gives good code maintenance as your data is hidden behind an interface. However the trade off is that it's harder to write effcient/performant code.

PhysicsChair, BreakableChair, StaticChar all inherit from the base `Chair` class, but other than that, there's almost nothing similar about them in terms of their internal data at all. How data is managed, transformed, etc. are all different. World modeling and OOP leads to non-performant code typically.

**Code is more important than data**
The purpose of any code is to transform/manage data. The data and how we handle it efficiently is the top priority.

There's no ideal abstract solution to a problem. No code is going to be future proof and last forever. For example, you aren't going to magically port Atari code to SNES code, or dreamcast code. The hardware and constraints are different.

## Example 1 Dictionary Lookup
In a dictionary, we think of a table in memory, where the key and value are associated with each other. But in reality, the key and value aren't actually associated with each other. Statistically, for a given key, there's a 1 /n probably that we use a value for that key, because there's only one value.

As we have more keys and values, we get less performant per apir. For a given key if you're iterating through the dictionary, most of the time you're going to get a value that's not your key's associated value. 

First solve for the common case.

Let's see what the C++ language and compiler do for us. Of course there are AMD custom hardware-accelerated instructions for stuff. But not many instructiosn aren't going to be these atan or transcendental things.

## Memory Accesses 
- Registers: Essentially free
- L1 Caches: 3 cycles.
- L2 Caches: 20 cycles.
- L3 and DRAM: 200+ cycles (often much slower though).

## L2 Cache Misses
The vast majority of misses are L2 cache misses. There are also other issues like shared memory modes. All of these change the characteristics of memory acceses.

## Example 2: Game Object (OOP)
```cpp
class GameObject {
    float m_Pos[2];
    float m_Vel[2];
    float m_Foo;
    void update(float f) {
        float mag = sqrtf(
            m_Vel[0] * m_Vel[0] +
            m_Vel[1] * m_Vel[1]
        );
        m_Foo += mag * f;
    }
};
```
Traditionally, we'd think the sqrt function is the problem. That's not really the problem. Le's look at the ASM:
```s
movss %xnn0, 12(%rsp)
movq %rdi, %rbx

# two 32-bit reads, 8-12 byte offsets probably on the same cache line
# say 200 cycles
movss 8(%rbx), %xmm1
movss 12(%rbx), %xmm0

# 10 cycles
mulss %xmm1, %xmm1
mulss %xmm0, %xmm0
addss %xmm1, %xmm0

# Generous 30 cycles
callq sqrtf

# This addresss was recently used so it should be in L1, 3 cycle cost.
mulss 12(%rsp), xmm0

# 200 cycles, we're definitely accessing a different cache line
addss 184(%rbx), %xmm0
movss %xmm0, 184(%rbx)
```
The time spent waiting for L2 (i.e., L2 miss) vs actual work we need to do is about 10:1. So most of the time in this function, we're actually just waiting for data to arrive rather than doing calculations. First let's reason about the waste of the cache line. We're only reading 8 bytes from the 64-byte cache line, so 56 of those bytes are wasted/doing nothing. Then in our `addss` operation at the end, we're using only 4 bytes out of another 64-byte cache line. Let's use more of that cache line. To do this, simply ensure that whole cache line contains data that you actually need. I'm not just dealing with one, I'm dealing with many objects, so you may as well transform them together and pack them into the same cache line

## Example 3: Somewhat Better
```cpp

// 12 bytes; 5 per cache line
struct FooUpdateIn {
    float m_Vel[2];
    float m_Foo;
};

// 4 bytes each; 16 per cache line 
struct FooUpdateOut {
    float m_Foo;
};

void update_foos(const FooUpdateIn* in, size_t count, FooUpdateOut* out, float f) {
    for (size_t i = 0; i < count; i++) {
        float mag = sqrtf(
            in[i].m_Vel[0] * in[i].m_Vel[0] +
            in[i].m_Vel[1] * in[i].m_Vel[1]
        );
        out[i].m_Foo += mag * f;
    }
}
```
`FooUpdateIn` is 12 bytes, so 5 of those is 60 bytes. `FooUpdateOut` is 4 bytes and 16 of those is 64 bytes, perfectly fitting int oa standard CPU cache line. But you may be surprised to hear that a 5 `FooUpdateIn` is actually 72 bytes. If you have an array of `FooUpdateIn` structs, look at how they pack into memory:
- Struct 1: Bytes 0-11
- Struct 2: 12-23
- Struct 3: 24-35
- Struct 4: 36-47
- Struct 5: 48-59

At 5 structs we have consumed 60 bytes, with exactly 4 bytes left at the end of the cache line. The sixth struct straddles the boundary between two cache lines. It's first 4 bytes are at the end of Cache Line 1, and its remaining 8 bytes spill over into Cache Line 2 (Spill Over). To process 6 complete elements, the CPU has to fetch and process 72 bytes of sequential memory. 

### Batch Processing 
Systems engineers rarely process one item at a time nor do they process all 10,000 items at once. THey process data in small batches. Let's choose batches of size 32 for two main reasons:
- **Reason 1: Perfect Cache Alignment** The 32 items divide perfectly in a standard 64-byte CPU cache line:
    - Inputs: 32 * 12 = 384 bytes, 384 / 64  = 6 cache lines.
    - Outputs: 32 * 4 = 128 bytes, 128 / 64 = 2 cache lines.
    - Note that both results are integers, a batch of 32 items means the CPU reads/writes perfectly clena blocks of memory. No bytes hang over into the next cache line, causing an extra accidental memory read. 
- **Reason 2: Vectorization (SIMD) and Powers of 2:** Modern CPUs have special hardware registers called SIMD that can perform math on multiple floats simultaneously. For example, handling 4, 8, or 16 floats in a single CPU cycle. Computers love powers of 2, a batch size of 32 unrolls perfectly into these hardware registers without leaving any awkward leftover elements at the end of one loop.

There are 5.33 elements per cache line, so our loop iterates 5.33 times to process it. It takes about 40 clock cycles of time to process a single element, and so processing an entire cache line's worth of elements takes 213.33 cycles of work. The processing time (213 cycles) is roughly equal to the memory fetch time (200-300 cycles), then the next block of data will arrive in the cache right as the CPU finishes the current block. The CPU minimizes stalling for RAM. This is the idea of **latency hiding**. The above code demonstrates the approximate speed up gained from simply using the entire cache line (avoiding waste). It can still be made more efficient if you use the cache line effectively, and use more advanced techniques not covered here. 

## Bools in Structs & Ghost Reads 

### Hidden Cost of Booleans
If your struct is already close to 64-bytes, adding a boolean into your struct may make your struct not memory aligned, and force the compiler to add padding. This can psuh the last members of your struct into the next cache line. Then to read those last members, the CPU is forced to perform an entirely separate DRAM read!

### Problems with Ghost Reads
```cpp
int Foo::bar(int count) {
    int value{0};
    for (int i = 0; i < count; i++) {
        if (m_NeedParentUpdate) {
            value++;
        }
    }
    return (value);
}
```
If `m_NeedParentUpdate` never chagnes whilst the loop is running, then reading it every single iteration is a **Ghost Read**, wasted CPU cycles becasue we're reading in data that we already have or data that doesn't change. The compiler can't absolutely prove that the loop body doesn't secretly chaneg `m_NeedParentUpdate` (pointer aliasing), so it'll continue re-reading that variable from memory in each iteration. Manually hoisting the boolean into a local variable before the loop will force it to sit in a lightning-fast CPU register.

## Information Density: 99.99% Waste 
Over 10,000 frames, Acton calculates that we only read/needed 915 bytes. However, due to bad data layouts, assume we trigger 2 L2 cache misses per frame. THen over 10,000 frames, we're loading in $2 \times 64 \times 10,000 = 1.28 \times 10^{6}$ bytes from DRAM. If we only needed 915 bytes of actual info, but forced the hardware to transfer $1.28 \times 10^{6}$ bytes, then we have $\frac{915}{1.2\times 10^{6}}=0.07%$ efficiency. Below are three proposed solutions to this:
1. **Packing (Data Streams):** Instead of giving every object its own `bool`, pull all the booleans out into a single bit vector. A single 64-byte cache line can hold 512 bits. The CPU can read a cache line and check the spawn status of 512 objects at once.
2. **Combine with Others:** If you have multiple flags, pack htem into a bitfield within a specialized execution block so the updates multiple states simultaneously.
3. Over Frames (Instruction Streams): Stop asking "Are you spawning yet?" 10,000 times. Instead, calculate the exact frame in the future when the object ***will*** spawn, and push that command onto a timeline queue (an instruction stream). The CPU only touches the object whe nit's actually time to do work.

### `OgreNode.cpp` Teardown
OGRE is a widely known open-source3D graphics engine. But the `OgreNode` isn't very hardware friendly, for a couple of reasons:
- **Monolithic Classes:** An `OgreNode` contains everything: names, scale, position, orientation, parent pointers, and child lists. If you want to update one thing like the positions, the CPU is forced to load everything into the cache anyways.
- **One-at-a-Time Trap:** The class design forces you to process Node A, then Node B, and then Node C in siolation. But it's most hardware friendly and efficient if we process a stream of objects at once.
- **I-Cache Ruin:** Since `OgreNode` uses inheritance, (Class A, Class B, Class C overriding virtual fucntions), the CPU has to look up function pointers in a vtable at runtime. The CPU can't predcit what code runs next, causing the I-Cache to constantly stall and clear itself.

**Golden Rules in Data-Oriented-Design (DoD)**
- Store each state and data type separately. Don't make a `Node` struct. Instead make parallel arrays of `Positions`, `Rotations`, `ids`.
- Eliminate runtime string operations; precompute filenames and ids into distinct integer hashes.

### Example 1
```cpp
void Node::translate(const Vector3& v, TransformSpace relativeTa) {
    switch(relativeTa) {
        case TS_LOCAL:
            mPosition += mOrientation * v;
            break;
        case TS_WORLD:
            if (mParent) {
                mPosition += (mParent->_getDerivedOrientation().Inverse() * v) / mParent->_getDerivedScale();
            } else {
                mPosition += v;
            }
            break;
        case TS_PARENT:
            mPosition += v;
            break;
    }
    needUpdate();
}
```
If you call this function inside a loop for 1000 nodes, the switch statement executes 1000 times. If all our nodes are mixed up somewhat randomly (Node 1 is local, Node 2 is  world, Node 3 is Parent), then the CPU is likely to have a good amount of branch mispredictions, which is going to waste a noticeable amount of cycles. 

**Solution: Triage and Organize**
Break the monolithic function into three separate functions (`TransformLocal`, `TransformWorld`, ``TransformParent`), we make the decision once. If the engine realizes, "Hey we're updating editor windows, all objects inside can be iterated over branchless as we apply the same transformation to all of them. Below is the implementation of those ideas:
```cpp
void Node::TransformLocal(Node* nodes, int count, const Vector3& v) {
    for (int i = 0; i < count; i++) {
        Node* node = &nodes[i];
        node->m_Position += node->m_Orientation * v;
    }
}

void Node::TransformWorld(Node* nodes, int count, const Vector3& v) {
    for (int i = 0; i < count; i++) {
        Node* node = &nodes[i];
        if (node->m_Parent) {
            node->m_Position += (node->m_Parent->_getDerivedOrientation().Inverse() * d)
                / node->m_Parent->_getDerivedScale();
        } else {
            node->m_Position += v;
        }
    }
}

void Node::TransformParent(Node* nodes, int count, const Vector3& v) {
    for (int i = 0; i < count; i++) {
        Node* node = &nodes[i];
        node->m_Position += v;
    }
}
```

## Array of Structs (AoS) vs. Struct of Arrays (SoA)
```cpp
class Node {
    Vector3 mPosition;              // 12 bytes
    Quaternion mOrientation;        // 16 bytes
    Vector3 mScale;                 // 12 bytes
    Node* mParent;                  // 8 bytes
    string mName;                   // 32 bytes (standard libc++ implementation)
    vector<Node*> mChildren;        // assume 24 bytes
    bool mNeedParentUpdate;         // 1 byte (+3 bytes padding)
    bool mNeedChildUpdate;          // 1 byte (+3 bytes padding)
}; // Total = 112 bytes minimum!
```
A collection `Node` objects in OOP are typically organized as a lareg Array of Structs (AoS). Each element is a separate/isolated struct/object containing its own state. A `Node` doesn't fit into a 64-byte cache line. To update one, the CPU must fetch two full cache lines from DRAM. Out of those 128 bytes, you may only read its position and orientation (28 bytes) to update it.

### Example 1: Data Stream (`NodeTranslation`)
```cpp
struct NodeTranslation {
    Vec3 n_Position;    // 12 bytes
    Quat n_Orientation; // 16 bytes
}; // Total 28 bytes

void Node:TranslateLocal(NodeTranslate* nodes, int count, count Vector3& v) {
    for (int i = 0; i < count; i++) {
        node->m_Position += node->m_Orientation * v;
    }
} 
```
How about pulling out the variables needed for this specific mathematical transformation into a struct. A 64-byte cache line holds 2.28 nodes nodes worth of data, and 100% of the bytes are used. An improvement, but it's still kind of bad.

### Example 2: Struct of Arrays (SoA)
The ultimate/typical pattern you see in data oriented design is a struct of arrays. Instead of grouping essential info like position and orientation together in a struct, you'd split htem into two separate parallel arrays.
```cpp
Vector* positions;        // 12 bytes per
Quaternion* orientations; // 16 bytes per
```
This vastly increases the information density:
- 5.33 positions per cache line.
- 4 orientations per cache line.

It's named the struct of arrays approach because typically you have one struct containing multiple parallel arrays like the ones above. In any case, this is the zenith of Data-Oriented Design. 


## Credits