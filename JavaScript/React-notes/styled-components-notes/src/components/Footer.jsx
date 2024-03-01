import Container from "./styles/Container.styled";
import { Flex } from "./styles/Flex.styled";
import { StyleFooter } from "./styles/Footer.styled";
import SocialIcons from "./SocialIcons";
export default function Footer() {
	return (
		<StyleFooter>
			<Container>
				<img src="./images/logo_white.svg" />

				<Flex>
					<ul>
						<li>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
							fugiat culpa quam sint assumenda aperiam!
						</li>
						<li>+1 543-123-4567</li>
						<li>example@huddle.com</li>
					</ul>
					<ul>
						<li>About me</li>
						<li>What We Do</li>
						<li>FAQ</li>
					</ul>
					<ul>
						<li>Career</li>
						<li>Blog</li>
						<li>Contact Us</li>
					</ul>

					<SocialIcons />
				</Flex>

				<p>&copy; 2021 Huddle. All rights reserved</p>
			</Container>
		</StyleFooter>
	);
}
