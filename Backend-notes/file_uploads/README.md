# Handling files in Express and backend
- Three main ways to store user uploaded files. 
1. Disk Storage: Storing files on disk is a common choice for smaller applications. It involves saving files to a physical folder on the server's disk. While this approach is simple and suitable for smaller applications, it may not be as scalable or reliable as cloud storage solutions.

2. Cloud Storage (e.g., Amazon S3, Google Cloud Storage, Azure Blob Storage): Cloud storage services offer scalable and reliable storage solutions for files. They provide features such as redundancy, scalability, and access control. Cloud storage is the preferred choice for larger-scale applications or those requiring advanced features.

3. Base64 Encoding: While not a storage solution per se, base64 encoding is a way to represent binary data (such as files) as text. It's often used in web applications to embed images or other binary data directly into HTML, CSS, or JSON payloads. However, as mentioned earlier, base64 encoding can be inefficient for storing large files due to increased file size and encoding/decoding overhead.



# Credits:
1. File project example with Multer (Web dev simplified): https://www.youtube.com/watch?v=3f5Q9wDePzY
2. Intro Grid fs with multer: https://www.youtube.com/watch?v=MVqaOiHo0S0
4. Mern and Multer (disk storage): https://www.youtube.com/watch?v=jfZyqZycjmA&t=163s