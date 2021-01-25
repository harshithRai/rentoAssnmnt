import styled, { css, keyframes } from "styled-components";
import {
  space,
  color,
  position,
  typography,
  border,
  layout,
  grid,
  flexbox,
  background,
  shadow,
} from "styled-system";

const fadeIn = keyframes`
  from {
    transform: scale(0.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(0.25);
    opacity: 0;
  }
`;

/* stylelint-disable font-family-no-missing-generic-family-keyword */
export const Box = styled.div`
  ${layout}
  ${space}
    ${color}
    ${typography}
    ${border}
    ${grid}
    ${flexbox}
    ${background}
    ${shadow}
    ${position}
    transition: transform 0.5s linear;
  cursor: ${(props) => (props.isLink ? "pointer" : null)};

  &:hover {
    transform: ${(props) => {
      const scaleRatio = props.scaleRatio ? props.scaleRatio : "scale(1.01)";

      return props.zoomOnHover || props.isLink ? scaleRatio : null;
    }};
  }

  .fadeIn {
    animation: ${(props) =>
        props.fadeIn
          ? css`
              ${fadeOut}
            `
          : css`
              ${fadeIn}
            `}
      0.3s ease-in;
  }
`;
/* stylelint-enable font-family-no-missing-generic-family-keyword */
