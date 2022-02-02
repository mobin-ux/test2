import styled from "styled-components";

export const AnimatedModalChildContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 16px 24px 19px 24px;
  box-sizing: border-box;
  border-radius: 16px;
  box-shadow: 0 -4px 10px 0 rgba(100, 101, 119, 0.15);
  border: none;

  animation: ${(props) =>
      props.isOpen ? "open-model-animation" : "close-model-animation"}
    0.3s;
  transition: height 0.3s;
  @keyframes open-model-animation {
    0% {
      -webkit-transform: translateY(100%);
      transform: translateY(100%);
    }
    100% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
  }
  @keyframes close-model-animation {
    0% {
      -webkit-transform: translateY(0);
      transform: translateY(0);
    }
    100% {
      -webkit-transform: translateY(100%);
      transform: translateY(100%);
    }
  }
`;
