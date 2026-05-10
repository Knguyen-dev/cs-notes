#include <benchmark/benchmark.h>
#include <vector>

static void escape(void *p) {
  asm volatile("" : : "g"(p) : "memory");
}

// "Magically write to all memory"
static void clobber() {
  asm volatile("" : : : "memory");
}

static void bench_create(benchmark::State &state) {
  while (state.KeepRunning()) {
    std::vector<int> v;
    escape(&v); // Keeps the vector around?
    (void)v;
  }
}
BENCHMARK(bench_create);

static void bench_reserve(benchmark::State &state) {
  while (state.KeepRunning()) {
    std::vector<int> v;
    v.reserve(1);

    // "We don't care about the vector being around, we only care about the 
    // data being around. SO that we can push back into it later""
    escape(v.data());
  }
}
BENCHMARK(bench_reserve);

static void bench_push_back(benchmark::State &state) {
  while (state.KeepRunning()) {
    std::vector<int> v;
    v.reserve(1);
    escape(v.data());
    v.push_back(42);

    // That integer we're pushing back is being read.
    clobber();
  }
}
BENCHMARK(bench_reserve);

BENCHMARK_MAIN();