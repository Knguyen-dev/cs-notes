# Database Migrations 
A way to manage changes to your database schema over time. As the app evolves you may need to add new things, add new tables, modify existing ones, or delete data. Migrations just makes sure these changes are applied consistently.

## Motivation Behind Database Migrations
The main point of database migrations is to ensure the schema of our application's database is kept consistent and synchronized across all environments. This includes developer laptops, staging, and production. All in a controlled and repeatable way.
- **Consistency:** When a new feature requires a new column (e.g. adding `last_login` column to the `users` table), every environment needs this exact change. Running the same, version-controlled migration file guarantees this happens everywhere, eliminating the "it works on my machine" database errors.
- **Version Control for the Database:** Just as we track code changes with Git, migration files track schema changes. 
- **Automated Deployment:** In modern CI/CD pipelines, the migration tool is run before the application code starts. This ensures the database is in the state the new code expects.
- **Safety and Reversibility (The `Down` Method):** The `Down` (or `Revert`) method is the safety net. If a new deployment fails, a change introduces a bug, we can use the `Down` script to instantly revert the database schema to its previous stable state, which helps for quick recovery.

### Example 1: Schema Changes
This involves modifying tables, columns, etc. Let's allow the user to add a profile picture. Each database migration file or action should have two methods:
- **Up:** How to apply changes to the database
- **Down:** How to reverse the changes made by this file.

```sql
-- Up Script: Adds profile_image_url to the user's table
ALTER TABLE users ADD COLUMN profile_image_url VARCHAR(255);

-- Down Script (The reverse of the up script)
ALTER TABLE users DROP COLUMN profile_image_url;
```
Another example could be renaming the column from `username` to `display_name` for clarity. The idea would be creating an "up" script that renames the column, and your down script would revert the column back to its original name.

### Example 2: Data Changes (Seed or Data Fixes)
Migrations can also be used to insert, update, or delete data that's critical for applications to function. For example, create essential roles (Admin, Editor, Guest) in a new `roles` table immediately after creating it. The "up" script would be creating that table and populating it, whilst the "down" script deletes those roles.

Another example could be if a bug accidentally set the `is_active` flag to `false` for all new users in the past 24 hours. To fix this, your migration action would be a script that sets `is_active = true` for all users within that 24 hour time frame.


### Example 3: Typical structure of a database migration file
Database migrations are often stored in `.sql` files containing the changes to the database that the file made. The files have a filename convention where you prefix it with a timestamp: `20230915120000_create_users_table` It's a numerical prefix, where files prefixed with smaller numbers go first. There's no strict rule that we have to use timestamps, it's just that timestamps are a convenient way to maintain order. 
```bash
001_init.sql
002_add_roles
003_add_users.sql
004_add_sessions.sql
005_add_shopping_carts.sql
```
In a real application, you may see a folder called `/migrations` folder that holds files describing how the database schema evolves over time (like above). Each migration contains structural changes such as creating tables or adding columns. When deploying the application (or during a setup step), the migration system applies any migrations that haven't been run yet, ensuring the database schema matches the current version of the code. Seeding the data is moreeso a separate step and is usually handled by dedicated seed files.

## Manual vs Automatic Migrations 

### Approach 1: Handling Migrations Manually
You're writing SQL files to alter tables, drop columns, delete data, etc. Then you're making sure the database is open and ready for changes. In order to revert your changes, you're going to write another SQL script to revert things into how they were.

### Approach 2: Automated Migration 
While manual SQL scripts work, Automated Migration Tools (e.g. Alembic, Django Migrations, Flyway) add a layer of management that's invaluable for large teams.
- **Tracking:** These tools maintain a special table in the database (e.g., `schema_migrations`) that track which migration files have already been applied and run.
- **Intelligence:** When we run the `migrate` command, the tool only runs the files that haven't been applied yet based on this tracking table.
- **Schema Generation:** These tools often automatically generate the `Up` and `Down` scripts by comparing the current database schema to the new schema defined in our application code. This reduces the risk of human error when writing SQL.