import { StFlexColumn } from "@/components/spaces/styles/spaceCommon.styles";
import styled from "styled-components";
import { StModalContents } from "./spaceModalCommens.styles";

export const StDiv = styled(StFlexColumn)`
  gap: ${(props) => props.theme.spacing[24]};
`;

export const StModalJoinSpaceContents = styled(StModalContents)`
  & > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${(props) => props.theme.spacing[16]};
  }
`;
