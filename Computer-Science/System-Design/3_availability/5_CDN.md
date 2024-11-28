# Content Delivery Networks

## What is a CDN?
A globally distributed network of proxy servers that are intended to serve content from locations that are closer to the user. Typically these serve static files such as HTML/CSS/JS, photos, and videos. This vastly increases load times. For example, a person in Japan will now see the photos on your simple website from Tokyo, rather than from Boston, where you're hosting the site. As a result, they'll have noticeable shorter wait times when seeing the photo.

However some CDNs such as Amazon's CloudFront allow you to serve dynamic content. Cloudflare which is just a web service package, is a free alternative. Anyways serving content from CDNS is pretty good as users get content from data centers closer to them, and your CDNs handle some requests that servers don't have to.

I mean the whole point of this is that you don't have servers all over the world, and this helps solve some of that.


## Pull CDNs
Grab new content from your server when the first user requests that content. Your content is on the server and you re-write the URLs to point to the CDN. For example, guy in Japan is loading your website. They are the first user in a while, so the server uploads the content to the CDN in Tokyo, and then the user sees your content. So for the first time there's no speed benefit. However for subsequent requests, the content is being delivered from the CDN rather than your server (for like 1-30 days), vastly boosting the response times.

Easy, but it can be annoying when you want to update a photo on your site, and you have to wait until hte previous cache is expired so that the users see the new photo.


## Push CDNs
Similar to pull CDNs, but rather than having the content be sent to the CDN when the first user accesses the website, we manually upload the content to the CDN. So we'll upload the content beforehand so our content is always available on the CDN servers.

Smaller sites or sites that have static content work well with push CDNs. Ideally content is placed on the CDN once and doesn't have to be re-pulled (updated) at regular intervals. 

Wouldn't be good if you have a lot of changing content in a given day. Pushing your data to the CDN takes a bit of work on the server, and if you're already struggling with the load, then this may not be a good choice.

## Which to choose
Let's say you have a travel site that hosts video and podcasts (large download sizes), a push CDN is probably cheaper and more efficient. This is because you send the CDN the content, and it only needs to process it once. No need to re-download the videos to your CDNs, unless you manually push.

A pull CDN is good for high-traffic-small-download sites as you're going to keep the most popular content on the CDN servers. Subsequent updates/pulls for content aren't going to happen often and operation is going to be cheaper than a push CDN.

# Credits:
1. [Push vs Pull CDNs](https://www.travelblogadvice.com/technical/the-differences-between-push-and-pull-cdns/)