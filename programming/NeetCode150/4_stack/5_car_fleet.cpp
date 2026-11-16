#include <vector>
#include <algorithm>
#include <stack>

class Solution {
    struct Car {
        int position;
        int speed;
    };

public:
    int stack(int target, std::vector<int>& position, std::vector<int>& speed) {
        // Create an array of cars (pairs of position and speed)
        // Sort the cars array in descending order based on positon 
        // (closest target is first).
        int n = position.size();
        std::vector<Car> cars(n);
        for (int i{0}; i < position.size(); i++) {
            cars[i] = {position[i], speed[i]};
        }
        std::sort(cars.begin(), cars.end(), [](const Car& a, const Car& b) {
            return a.position > b.position;
        });


        std::stack<double> car_stack;
        for (int i = 0; i < cars.size(); i++) {
            double t = static_cast<double>(target - cars[i].position) / cars[i].speed;
            if (car_stack.empty()) {
                car_stack.push(t);
                continue;
            }

            // Current car will take longer than the previous fleet to 
            // reach the destination. It forms a new fleet.
            if (t > car_stack.top()) {
                car_stack.push(t);
            }
        }

        return car_stack.size();
    }

    int iteration(int target, std::vector<int>& position, std::vector<int>& speed) {
        int n = position.size();
        std::vector<Car> cars(n);
        for (int i{0}; i < position.size(); i++) {
            cars[i] = {position[i], speed[i]};
        }

        // Sort in descending positon (closest target is first)
        std::sort(cars.begin(), cars.end(), [](const Car& a, const Car& b) {
            return a.position > b.position;
        });

        int num_fleets = 0;
        double max_time = 0.0; // time taken by fleet leader
        for (int i{0}; i < cars.size(); i++) {

            // Calculate the time needed for the current car to reach the target.
            // If the current car takes longer than the fleeet ahead of it, then 
            // it cannot catch up. Therefore it forms a new fleet.
            double current_time = static_cast<double>(target - cars[i].position) / cars[i].speed;
            if (current_time > max_time) {
                num_fleets++;
                max_time = current_time;
            }
            // Otherwise it catches up and merges with the current fleet
        }

        return num_fleets;
    }
};