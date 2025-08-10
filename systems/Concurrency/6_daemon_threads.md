# Daemon vs Non-Daemon Threads 

## What is a Daemon Thread In Python?
By default, threads in Python are non-daemons, meaning they will prevent the program from exiting until they finish running. This is useful when you need threads to do critical work that must be completed before the program ends. However, in many cases, you don't want the program to wait for background threads to finish. By setting daemon=True, you are telling the Python interpreter to allow the main program to exit even if the daemon threads are still running. This is great for background tasks. In our code, we have a cleanup thread that periodically checks long-running processes. This is a background task that runs independently of the main program. It's not critical to the main program flow, so set it as a daemon true so it doesn't block the main program. TLDR, set daemon=True to ensure they run in the background without preventing the program from exiting.

Let's review. **Non daemon threads (default):**
- Main program will wait for these threads to finish before exiting.
- If you have a long-running thread, your program can hang on shutdown.
- The program won't terminate until all non-daemons threads are complete.

**Daemon Threads (`daemon=True`):**
- The main program won't wait for these threads to finish.
- When the main program exits, daemon threads are automatically killed.
- They run in the "background" and don't prevent program shutdown.


```python
# When your webserver shuts down:
# - Without daemon=True: The server hangs waiting for the task to finish before shutting down.
# - With daemon=True: Server shuts down cleanly, all background tasks are destroyed.
thread = threading.Thread(
  target=start_process_pdfs,
  args=(run_id, files),
  daemon=True # Server can shutdown without waiting for PDF processing to be done.
)
```
Of course there are some important considerations. The pdf processing thread could be killed mid operation, so you might want to implement some graceful shutdown handling in your function.


## How does this translate to other languages and programming in general?
Java has daemon threads that work almost identical how python has it, with JVM only exiting when daemon threads remain. C# has the idea of background and foreground threads, which is similar. Other languages have different approaches to threading and concurrency of course.

However there is still the common idea of "should this background task prevent the program from shutting down". I mean in process-based systems we have daemon vs regular processes. 