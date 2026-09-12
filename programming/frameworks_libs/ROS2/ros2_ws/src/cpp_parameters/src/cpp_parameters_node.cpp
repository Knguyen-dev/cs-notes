#include <chrono>
#include <functional>
#include <string>
#include <rclcpp/rclcpp.hpp>

using namespace std::chrono_literals;

class MiniParam : public rclcpp::Node {
private:
    rclcpp::TimerBase::SharedPtr timer_;
public:
    MinimalParam() : Node("minimal_param") {
        
        // Optional parameter description
        auto param_desc = rcl_interfaces::msg::ParameterDescriptor();
        param_desc.description = "A parameter for demonstration purposes";
    
        // Create a parameter with default value and description.
        // Every 500ms we query and log the value of said parameter, 
        // and reset it each time.
        this->declare_parameter("my_parameter", "world", param_desc);
        auto timer_callback = [this]() -> void {
            std::string param = this->get_parameter("my_parameter").as_string();
            RCLCPP_INFO(this->get_logger(), "Hello %s", param.c_str());
            std::vector<rclcpp::Parameter> all_new_params{
                rclcpp::Parameter("my_parameter", "world")
            };
            this->set_parameters(all_new_params);
        };
        timer_ = this->create_wall_timer(500ms, timer_callback);
    }
};

int main(int argc, char **argv) {
    rclcpp::init(argc, argv);
    rclcpp::spin(std::make_shared<MinimalParam>());
    rclcpp::shutdown();
    return 0;
}