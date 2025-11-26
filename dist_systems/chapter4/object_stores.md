# Object Stores
A method for storing large amounts of unstructured data. Each object (unit of data) is stored with its metadata and a UID for data retrieval. Each object is just a file. Much of today's data is unstructured: emails, media, sensor data, etc. It doesn't fit easily into traditional structured databases. Therefore, there's a need for efficient and affordable ways to store  this data, which is why object storage is needed.

## How Object Storage Works
Saves files as a self-contained object containing All these objects are stored flat data environment or storage pool. We'll use the UID and metadata of the object to retrieve its data. Objects are stored in a "global storage pool". Rather than storing these files in a tree-like hierarchy, they're stored in a flat environment, which allows us to store a lot more data. Instead of storing these objects in a standard filesystem, you'd be able to store a lot more data (petabytes, or even exabytes) in the object store. Of course your global storage pool can be spread out into multiple distributed storage devices in different regions, which is an example of how you can scale.

## File and  Block Storage

### Explaining File Storage.
File storage stores data into folders. It uses a hierarchical approach to storing objects. As an analogy, if we want the information for a specific file, we need to know the room, cabinet, drawer, and folder that contains the file. We'll need to know the path the file is located in.This tree-based traversal can make file retrieval time-consuming as the number of files grow, which limits the scalability. It's not the best, but it's simple enough to store small amounts of unstructured data and allow multiple users to access that data.

### Block Storage
Improves file storage by breaking files into separate blocks of data that we store separately. It assigns a UID to each block (a chunk of raw data). Then when someone wants to read the file, we use the UID to reassemble the blocks back into the original file. Unlike file storage, we don't need some kind of path to do retrievals, which keeps this storage mechanism fast. The some downsides with block storage is that it's expensive and offers no metadata capabilities.

### Limitations of Object Storage
Object storage works best in situations where we write to the data once and may read it many times. It eliminates the need for hierarchical organization, but it's not efficient for dynamic data. Dynamic data changes constantly and would cause us to rewrite the entire object to modify it, which is not performant.

## Credits
- [What is Object Storage? - Google Cloud](https://cloud.google.com/learn/what-is-object-storage)