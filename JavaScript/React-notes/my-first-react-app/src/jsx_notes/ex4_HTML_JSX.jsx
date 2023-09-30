/*
Closer look on how HTML is converted into JSX. Putting all of those rules together let's try to convert the html below into jsx:

- Before we start, of course it's important to know how html is translated into jsx to actually know what parts of the code means what,
and why things look how they look. However, it's also common practice to use software that converts html to jsx and it's practical. 
So after mastering this, feel free to use a converter: https://transform.tools/html-to-jsx

- Starting HTML:
<h1>Test title</h1>
<ol class="test-list">
  <li>List item 1
  <li>List item 2
  <li>List item 3
</ol>
<svg >
   <circle cx="25" cy="75" r="20" stroke="green" stroke-width="2" />
</svg>
<form><input type="text"></form>

- Step 1. Put it all into one wrapper to return one root element
<div>
    <h1>Test title</h1>
    <ol class="test-list">
        <li>List item 1
        <li>List item 2
        <li>List item 3
    </ol>
    <svg>
    <circle cx="25" cy="75" r="20" stroke="green" stroke-width="2" />
    </svg>
    <form><input type="text"></form>
</div>

- Step 2: Close our tags on our li and input elements
<div>
    <h1>Test title</h1>
    <ol class="test-list">
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
    </ol>
    <svg>
    <circle cx="25" cy="75" r="20" stroke="green" stroke-width="2" />
    </svg>
    <form><input type="text"/></form>
</div>

- Step 3: Apply camel casing, to 'class' and 'stroke-width'
<div>
    <h1>Test title</h1>
    <ol className="test-list">
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
    </ol>
    <svg>
    <circle cx="25" cy="75" r="20" stroke="green" strokeWidth="2" />
    </svg>
    <form><input type="text"/></form>
</div>






*/
