/*
- By wrapping 'Suspense' around Outlet, you're telling 
  React that everything rendered inside the Outlet has the chance
  to be lazy loaded, and that's correct as the 'Home' page is rendered
  inside the <Outlet/> is actually lazily-loaded.

  + The process step by step:
  1. Click on home link, code for Home is downloaded, and then rendered.
  2. However if it's a big component or your internet is slow then
    you'd actually be waiting at a white-screen for a noticeable bit.
    Here you can use the fallback prop, which will render some markup
    while the component is being loaded. So while the Home page is being 
    downloaded, your component or text inside fallback will be rendered in its place.
    You can use this as a loading screen.

 */

import { Suspense } from "react";

import { Link, Outlet } from "react-router-dom";
import React from "react";
export default function NavWrapper() {
  return (
    <>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/about">About</Link>
      </nav>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
}
