import * as React from "react";
import styled from "@emotion/styled";
import MDLogo from "../assets/MD-Logo.png";

const HeaderContainer = styled.header({
  display: "flex",
  padding: "1rem",
  alignItems: "center",
});
const LogoImage = styled.img({
  height: 100,
  width: 100,
});
const Title = styled.div({
  fontWeight: 700,
  fontSize: 16,
  color: "#f8f8f8",
});

export const Header = () => {
  return (
    <HeaderContainer>
      <LogoImage src={MDLogo} />
      <Title>Material Depot Search</Title>
    </HeaderContainer>
  );
};
