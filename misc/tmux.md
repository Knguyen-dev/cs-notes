# Tmux Explained

Tmux is a terminal multiplexer. It's a program that runs inside of our terminal. In turn it lets other terminals run inside of it.

Start a tmux session with `tmux` in your cmd. Then do CTRL+B. Now press D. This detaches a from our tmux session. Closing the window for us. However the tmux session will still be running whatever it's running whilst you're detached ("logged out"). Then you can re-attach to that session ("log back in") by doing `tmux a`. This opens tmux again exactly where you left off.

## Tmux Layers 

### Sessions
The first or outermost layer is the session. We can create a new tmux session named "bob" like so: ```tmux new -s bob``. To see all tmux sessions, we can do `tmux ls`. Note that `tmux a` attaches to the most recent session. Alternatively, to specify what session to attach to, we'll do `tmux a -t <session_index>` to attach to a given session.

To kill a session, we can do `tmux kill-session -t <session_name>`. 

### Windows


## Credits
- [Tmux in 100 Seconds](https://youtu.be/vtB1J_zCv8I?si=Gru-MLscOwLc4VjY)
- [Tmux Explained - Network Chuck](https://youtu.be/nTqu6w2wc68?si=L8pUHwbj317QPFlx)