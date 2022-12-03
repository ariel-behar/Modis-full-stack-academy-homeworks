import React from 'react'
import { StyledMainSection } from './styles/Main.styled';
type MainProps = {
    children: React.ReactNode; 
  };


function Main(props: MainProps) {
  return (
    <StyledMainSection>
        {props.children}
    </StyledMainSection>
  )
}

export default Main