/*
+ What is a styled component: Basically 

+ How to create a styled component
1. Do styled.elementTag``; and insert your css rules in the backticks
2. Now you created a styled html element. So
    doing <Container>...</Container> would wrap
    the child elements in a container that's styled
    like this.
*/

import styled from "styled-components"

export const Container = styled.div`
    width: 1000px;
    max-width: 100%;
    padding: 0 20px;
    margin: 0 auto;
`
