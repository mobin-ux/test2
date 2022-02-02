import React from "react";
import styled from "styled-components";

const StyledNftItem = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid #4594f733;
  }
  padding-left: 30px;
  padding-right: 30px;
  @media screen and (max-width: 1023px) {
    padding-left: 8px;
    padding-right: 8px;
  }
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  p {
    font-size: 28px;
    font-style: normal;
    font-weight: 400;
    line-height: 42px;
    letter-spacing: 0;
    text-align: left;
    color: #373f51;
    @media screen and (max-width: 1023px) {
      font-size: 20px;
      line-height: 24px;
    }
  }
  span {
    display: block;
    font-size: 28px;
    font-style: normal;
    font-weight: 300;
    line-height: 42px;
    letter-spacing: 0;
    text-align: left;
    color: #373f51;
    @media screen and (max-width: 1023px) {
      font-size: 20px;
      line-height: 24px;
    }
  }
  .image {
    position: absolute;
    width: 178px;
    height: 240px;
    border-radius: 14px;
    border: 8px solid #ebf1ff;
    object-fit: cover;
    right: 20%;
    padding: 5px;
    z-index: 1;
  }
`;

const NftItem = ({ meta, amount, symbol }) => {
  const [show, setShow] = React.useState(false);
  const handleHover = () => setShow(true);
  const handleLeave = () => setShow(false);
  return (
    <StyledNftItem onMouseOver={handleHover} onMouseLeave={handleLeave}>
      <p>{meta?.name}</p>
      <span>
        {amount} {symbol}
      </span>
      {show && <img className="image" src={meta?.image} alt="" />}
    </StyledNftItem>
  );
};

export { NftItem };
