# Command Pattern

Take the different operations that you want to do, encapsulate them into individual 'commands'. These commands then have a 'execute', and 'undo' method. You can do the operation and undo the operation.

## Example:
Let's talk about controlling smart devices. I have a remote that can manipulate different wifi connected
light bulbs in my house. I simply use my phone to program the different buttons on the remote to 
different lights.

Now how would be program the phone app. When one person presses 'ON' it may be different from what another 
person wants, because two people have the functions programmed to different lightbulbs. We also have lots of 
different lightbulbs in our home, and then multiple controllers. A good idea would be have a controller interact with a lightbulb in its own room, or two controllers with one for
each half of the room. Or even two controllers controlling their own halfs of the room, but clicking 'Off" for one turns all light bulbs you have.

The actions for each button "ON", "OFF", "dim light", etc. can't be hard coded, as we want the user to 
be able to program, which lightbulb are being affected. The idea is a 'TurnLightOnCommand' that 
accepts a specific lightbulb or an array of lightbulbs. The idea is that we pass the lightbulbs we want to mess with into the command. 

However, what if our remote was universal for all appliances in a certain brand. We want our remote to 
turn on the thermostat, or a light bulb, etc. Just pass in the objects to the TurnOnCommand class, now we pass that 
commadn to our invoker (remote), later we'll be able to invoke it to affect the original objects (our receivers).