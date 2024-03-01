/*
+ Convention: Put ".module" to indicate that it's a css module.
  Here we treat the css file like an object. We import the 
  css file as an object/variable. Then we treat its classes 
  as properties. For example, if you have '.some_button_class', to apply it 
  onto a single button, you'd do <button className={myCssModule.some_button_class}>
  to apply it!


*/

import HeaderCSS from "./styles/Header.module.css";
export default function Header() {
	return (
		<header>
			<h1>My Header</h1>
			<button className={HeaderCSS.btn}>My Fancy Button</button>
		</header>
	);
}
