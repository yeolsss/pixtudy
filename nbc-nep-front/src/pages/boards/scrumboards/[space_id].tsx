import Layout from "@/components/layout/Layout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";
import styled from "styled-components";

const Scrumboard: NextPageWithLayout = () => {
  return (
    <StScrumboardContainer>
      <StColumn>
        <h1>no status</h1>
        <StItemList>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
        </StItemList>
      </StColumn>
      <StColumn>
        <h1>to do</h1>
        <StItemList>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
        </StItemList>
      </StColumn>
      <StColumn>
        <h1>in progress...</h1>
        <StItemList>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
        </StItemList>
      </StColumn>
      <StColumn>
        <h1>done!</h1>
        <StItemList>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
        </StItemList>
      </StColumn>
      <StColumn>
        <h1>et cetera</h1>
        <StItemList>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
          <StListItem>lorem ipsum dolor sit amet</StListItem>
        </StItemList>
      </StColumn>
    </StScrumboardContainer>
  );
};

Scrumboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async () => {
  return { props: {} };
};

const StScrumboardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing[12]};
`;

const StColumn = styled.ul`
  width: 20%;
  height: 100%;
`;

const StItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing[12]};
  background-color: #f5f5f5;
  border-radius: ${(props) => props.theme.border.radius[8]};
  padding: 10px;
`;

const StListItem = styled.li`
  padding: ${(props) => props.theme.spacing[12]};
  width: 100%;
  height: ${(props) => props.theme.unit[64]}px;
  background: ${(props) => props.theme.color.bg.primary};
  border: 1px solid ${(props) => props.theme.color.border.primary};
  border-radius: ${(props) => props.theme.border.radius[12]};
`;

export default Scrumboard;
