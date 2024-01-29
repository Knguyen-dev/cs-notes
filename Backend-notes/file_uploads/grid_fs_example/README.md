# GridFS
- A mongodb tool that allows us ot store and retrieve large files in MongoDB. Recommended when we want to store files that are larger than the size of a BSON-document, 16 megabytes. 

# How does GridFS work
- Organizes files in a bucket, which is just two MongoDB collections, chunks and files. The former collection stores binary file chunks, whilst the latter stores file metadata. Collections are prefixed with a name, default is 'fs'. This can help you in situations where you're looking for the bucket for 'user profile pictures' or the bucket for 'user posts pictures'.


# Project setup:
1. npm i mongodb express multer ejs;
2. npm i -D nodemon;


# Credits: 
1. Gridfs Nodejs Docs: https://www.mongodb.com/docs/drivers/node/current/fundamentals/gridfs/#std-label-gridfs-create-bucket
2. Gridfs tutorial: https://www.youtube.com/watch?v=MVqaOiHo0S0
3. Multer tutorial: https://www.youtube.com/watch?v=i8yxx6V9UdM