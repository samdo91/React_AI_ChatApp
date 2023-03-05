import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { chatSelsects } from "../../store/global";
import { useAtom } from "jotai";

function Header() {
  const [chatSelsect] = useAtom(chatSelsects);

  return (
    <HeaderBox>
      <StyledLink to={`/`}>
        <h1>{chatSelsect}</h1>
      </StyledLink>
    </HeaderBox>
  );
}

export default Header;

const HeaderBox = styled.div`
  content: "";
  display: block;
  border-bottom: 1px solid #bcbcbc;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

// const Links = styled.Link`
//   text-decoration: none;
// `;
