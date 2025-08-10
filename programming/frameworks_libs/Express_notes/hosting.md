# Hosting and Deployment:

- All websites, whether a personal one or a company website, needs to be hosted on the internet so that others can access them.

# What are hosting providers:

- Companies that own servers and rent space on them to customers. Then these customers can use the space to store and host thier websites so that anyone on the web can access them. It's kind of like a landlord for servers, as they provide a place for our websites to live.

- Github is a hosting provider, with their github pages, which is good for hosting static websites. But not for dynamic websites, which use a backend with things such as server-side rendering, databases, etc. As well, Github pages can't run NodeJS apps, and doesn't have the database services we can use.

- Alternatives: From big and complex cloud providers such as AWS, Google Cloud, and Microsoft Azure, to beginner firendly platform as a service (PaaS) providers such as Heroku, Railway, Render, and Fly.io

# Review of static vs dynamic sites:

- Consists of pre-written html pages, and they're static because everyone who visits them sees the same content. It's all hard coded in, in contrast to sites that change content based on the user. An examnple of a dynamic site is Twitter, as each user sees different content on their homepage due to who they follow. To build a dynamic site we still need HTML/CSS/JS, but also server-side code and a database.

# Platform as a service (PaaS):

- A specific hosting provider that makes hosting easier for beginners. The hosting provider manages the underlying details of server infrastructure, allowing devs to focus more on building our applications instead of configuring the servers they run on. They work by giving us easy access to some resources that apps can't live without to function on the web.

1. Instances: These are virtual 'computers', so one instance is one instance of our application is running. While a single instance can handle multiple users concurrently, with multiple instances we can increase the amount of traffic we can handle on our site. With instances and the ability to have multiple, we can scale up our application.
2. Databases: PaaS providers make it easy to create a new database by doing the setup and configuration for you. Many providers even manage it by setting up automatic backups, maintaining the security, and doing maintenance to keep your databases operating smoothly. Railway, a PaaS provider has integrated MongoDB database services, so it's a popular option.
3. Domain names: PaaS providers will typically give a random domain name when you first deploy. They give each app a unique domain name as long as the app is hosted on their platform. In the real world, sites have custom domain names that they make themselves. In those situations, you'll purchase a domain from a registrar such as Porkbun or NameSilo. To find a new domain name, try using Domainr.

- NOTE: In the case you actually have a custom domain, you'll have to look at the documentation of your provider to get your site pointing towards that custom domain. Remember, the PaaS is still hosting your application, and the domain name is just going to point to it.

- BOOK MARK: Create a hosting notes. Here we'll take notes on how to host an express app via Netlify
  and then via glitch. After we have our example projects up, we can then probably host our real projects.
