import { StyleHeader } from "./styles/Header.styled";
import { Container } from "./styles/Container.styled";
/*
- Passing 'bg' prop to StyleHeader
    <StyleHeader bg="#ebfbff">
      <h1>Hubble</h1>
    </StyleHeader>
*/
export default function Header() {
  return (
    <StyleHeader>
      <Container></Container>
    </StyleHeader>
  );
}
