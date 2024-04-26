# Facade Pattern
The idea is to create our own custom api or function that deals with separating the complex code from the business/human logic that we're doing. The result should be an easily flexible and changeable function.

Rather than changing code everywhere, we use the facade everywhere instead. As a result, if we need things to change we only change the facade itself.

Essentially, turn a difficult to use/read API, and improve it by using a nicer version of it that keeps the more complex stuff hidden. As a result your code is easier to use and refactor. Of course this doesn't just apply to working with 'apis', but also just a general programming tip. So far this seems like one of the more important patterns to keep in mind. 