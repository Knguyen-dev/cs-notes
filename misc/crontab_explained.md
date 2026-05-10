# Cron

A daemon (background process) that executes scheduled tasks or commands at specified times or intervals. It's commonly used to automate repetitive tasks like: cleaning up log files, sending emails, and periodically backing up data. The Cron daemon/service is always running and checks for tasks to execute based on the schedule defined in the crontab file. 

## What is Crontab?
Stands for "Cron Table" and it's a config file that specifies the schedule and commands for Cron to look out for. Each user on a system can have their own crontab file. The file defines: 
  1. The time and date schedule for executing a task.
  2. The command or script to execute

### Crontab file commands
There are a few commands to use when working with Crontab:
```bash
# View crontab file
crontab -l

# Edit crontab file
crontab -e

# Remove crontab file
crontab -r
```

## Crontab Syntax
```
* * * * * my_command_name
```
- **minute:** First asterisk, so every minute
- **hour:** second asterisk, every hour
- **day **of the month: third asterisk, every day of the month.
- **month:** Every month
- **dow:** Every day of the week

#### Example 1
```
5 * * * * echo "hello world"
```
Every single hour, of any day of the month (15th, 6th), during any month, in any day of the week (monday, friday, etc.), execute this command when the minute field is 5.

#### Example 2
```
5 9 * * * echo "hello world"
```
Run this command every day at 9:05 am. Regardless of what the day of the month it is, or what month we're in, or what day of the week we're at, when the time is 9:05 am, run this command.

#### Example 3
```
5 9 15 * * echo "hello world"
```
Run this command at 9:05 am, on the 15th of a given month, for any month, it doesn't matter what day of the week it is.

#### Example 4
```
5 9 15 8 * echo "hello world"
```
Once a year, on August 15th 9:05 am, run this command.

### Example 5:
```
5 9 15 8 5 echo "hello world"
```
The day of the week can be from 0 to 7. Sunday can be either 0 or 7, either is valid. This particular command runs on August 15th 9:05, as long as this date is a Friday. Very restrictive.

### Example 6:
```
* 11 * * * echo "hello world"
```
Every day, once we hit 11:00 am for every minute we will run the command.  After 11:59 am it stops until the next day at 11:00 am.

### Example 7: Using simple annotations
```
@hourly echo "hello world"
```
This is an easy way to set up a command to run hourly, or daily, etc. Just use the right annotation. There are also special annotations that give us features we wouldn't get with regular cron tables:

```
@reboot echo "hello world"
```
Only do this task when the server reboots.


## Installing and setting up Cron

Check if installed
```
sudo service cron status
```

## Credits
1. [Crontab generator](https://crontab-generator.org/)