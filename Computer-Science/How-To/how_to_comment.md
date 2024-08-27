# How to write comments 

"If you feel like you need human language to explain your code, then try to make your code more human."

Comment 'why' you're doing something instead of 'what'. While the latter is typically obvious, the former isn't. A bloated amount of comments could make our code a lot less readable. There are three types of comments. Comments that tell you:
1. How the code works.
2. How to use the code (documentation).
3. Why this design was chosen for the problem, and what are the pitfalls/obstacles we overcame.

Readable code could make type 1 comments obsolete. Of course, the most dangerous part is one person could see some code as 'self-documenting', whilst another person won't. 


### Example 1
```
<!-- Initial code -->
# A status of 5 indicates a message was sent
if status == 5:
  message.markSent()

<!-- More human readable -->
MESSAGE_SENT = 5
if status == MESSAGE_SENT:
  message.markSent()
```

### Example 2
```
<!-- Initial: Pretty complex and lengthly conditional -->
# Can update message if current user is the author of the message and the message was delivered less than 5 minutes ago, OR # if the current user is an admin
if (message.user.id == current_user.id and message.delivered_time() is None or (datetime.now() - message.delivered_time()).seconds < 300)) or current_user.type == administrator:
  message.update_text(text)

<!-- Improved: Quite better, the code is more human-language like.  -->
def can_edit_message(current_user, message):
  FIVE_MINUTES = 5 * 60
  user_is_author = message.user.id == current_user.id
  is_recent = message.delivered_time() is None or (datetime.now() - message.delivered_time()).seconds < 300))
  user_is_admin = current_user.type == User.Administrator

if (can_edit_message(current_user, message)):
  message.update_text(text)
```

# Credits:
1. [Comments in Code](https://www.youtube.com/watch?v=Bf7vDBBOBUA)


