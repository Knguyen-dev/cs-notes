import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import { StyleSocialIcons } from "./styles/SocialIcons.styled";
export default function SocialIcons() {
	return (
		<StyleSocialIcons>
			<li>
				<a href="https://twitter.com">
					<FaTwitter />
				</a>
			</li>

			<li>
				<a href="https://facebook.com">
					<FaFacebook />
				</a>
			</li>

			<li>
				<a href="https://twitter.com">
					<FaLinkedin />
				</a>
			</li>
		</StyleSocialIcons>
	);
}
