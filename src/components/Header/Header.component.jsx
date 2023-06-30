import { styled } from "styled-components";
import { GiCarKey } from "react-icons/gi";

const Header = () => {
  return (
    <StyledHeader>
      <GiCarKey className="icon" />
      <h2>This page will show You some info about the cars</h2>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 100px;
  -webkit-box-shadow: -1px 21px 26px -19px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -1px 21px 26px -19px rgba(0, 0, 0, 0.75);
  box-shadow: -1px 21px 26px -19px rgba(0, 0, 0, 0.75);
  .icon {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
`;

export default Header;
