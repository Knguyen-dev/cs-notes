#include <chrono>
#include <memory>
#include "rclcpp/rclcpp.hpp"
#include "more_interfaces/msg/address_book.hpp"

using namespace std::chrono_literals;

class AddressBookPublisher : public rclcpp::Node {
public:
    AddressBookPublisher() : Node("address_book_publisher") {
        publisher_ = this->create_publisher<more_interfaces::msg::AddressBook>(
            "address_book", 10
        );

        // Create the callback that creates and publishes the message 
        // to the "address_book" topic. If messages aren't being ACKed,
        // buffer the 10 most recent messages for retry. If an 11th message is published
        // before the queue is cleared (e.g., something is ACKed), then the oldest
        // message will be dropped.
        auto publish_msg = [this]() -> void {
            auto message = more_interfaces::msg::AddressBook();
            message.first_name = "John";
            message.last_name = "Doe";
            message.phone_number = "1234567890";
            message.phone_type = message.PHONE_TYPE_MOBILE;
            this->publisher_->publish(message);
        };

        // Publish a message each second
        timer_ = this->create_wall_timer(1s, publish_msg);

    }

private:
    rclcpp::Publisher<more_interfaces::msg::AddressBook>::SharedPtr publisher_;
    rclcpp::TimerBase::SharedPtr timer_;
};