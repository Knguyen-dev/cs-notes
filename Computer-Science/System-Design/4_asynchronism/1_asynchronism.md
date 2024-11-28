# Asynchronism 

### **What is Asynchronous Workflow?**
Asynchronous workflows help perform **time-consuming operations in the background**, reducing request times and allowing the main application to remain responsive. Instead of blocking a user's request until the task completes, the application can offload the task to be handled later and notify the user upon completion. 

#### **Examples of Asynchronous Workflows:**
1. **YouTube Video Uploads**:
   - When a user uploads a video, the task involves saving the file, processing (transcoding), and making it available for streaming. This can take several minutes to hours. The upload continues even if the user closes the app, and the user is notified when the process is complete.

2. **Email Sending**:
   - When a user submits a contact form or triggers a password reset email, the system does not wait for the email to be sent before responding. The email-sending task is added to a queue, processed by a worker, and sent in the background. 

3. **Order Processing in E-commerce**:
   - Placing an order involves tasks like payment processing, inventory checks, and shipping notifications. Instead of blocking the user with all these steps, the system confirms the order and handles backend operations asynchronously.

4. **Twitter**:
   - Posting a Tweet on Twitter. The tweet is probably posted instantly on your timeline, but it could take some time before it's delivered to all of your followers.
---

#### **What Does "Inline" Mean?**
**Inline operations** are tasks performed immediately within the scope of a user’s request. They complete sequentially before the application responds to the user. These are typically **fast, low-latency tasks**, such as:
- Viewing a Reddit post.
- Saving a comment.
- Retrieving user profile data.

For **expensive or long-running tasks**, performing them inline would make the application unresponsive. Instead, these are moved to **asynchronous workflows**. So we'll learn how we can handle these types of tasks using 'message queues".
