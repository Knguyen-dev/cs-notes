/* eslint-disable react/prop-types */
/*
+ Loading skeleton: Gives a nice animatio nof what the content 
  would look like once we're fully loaded. Makes it really 
  easy to use with circles imitating avatars, and rectangles which 
  can imitate text or other content. Let's create a reusable loading 
  component that we can not only on a datagrid but also anywhere else.


variants:
1. circular: For avatars or pfps
2. rectangular: videos, images, etc. There's a lot of 
  variants for imitating the loading of different types of content.

+ How to:
1. Remember we're making it reusable so we're going to pass in some children prop.
2. Never going to use something out of the box before customizing it to fit our 
  own needs and also making it flexible. 
3. Now we can wrap this around our content. We can of course pass in props 
  to make it more reusable

*/

import { Skeleton } from "@mui/material";
export default function Loading({ variant, children }) {
	return <Skeleton variant={variant}>{children}</Skeleton>;
}
