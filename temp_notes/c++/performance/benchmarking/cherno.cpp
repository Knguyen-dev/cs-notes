
/*
Whenever you're benchmarking something, remember that the compiler will optimize your code a lot.
Therefore, it's best to amke sure that you're actually benchmarking based on that optimized code. 

NOTE: Other than that, not much gained.

*/


#include <iostream>
#include <memory>
#include <chrono>

class Timer  {

private:
  std::chrono::time_point<std::chrono::high_resolution_clock> m_StartTimepoint;

public:
  Timer() {

    // On creation start the timer, on destruction, stop the timer
    m_StartTimepoint = std::chrono::high_resolution_clock::now();
  }

  void Stop() {
    auto endTimepoint = std::chrono::high_resolution_clock::now();

    // Measuring in microseconds the start time
    // NOTE: auto will be long long
    auto start = std::chrono::time_point_cast<std::chrono::microseconds>(m_StartTimepoint).time_since_epoch().count();
    auto end = std::chrono::time_point_cast<std::chrono::microseconds>(endTimepoint).time_since_epoch().count();

    auto duration = end-start;
    double ms = duration * 0.001; // in milliseconds
    std::cout << duration << 'us (' << 'ms' << '\n';
  }
  
};


int main() {
}