import useConfirm from "@/hooks/confirm/useConfirm";
import useMetaverseScrumIsOpenStore from "@/zustand/metaverseScrumIsOpenStore";
import useCreatePhaser from "@/hooks/metaverse/useCreatePhaser";
import {
  StMetaverseMain,
  StMetaverseWrapper,
} from "@/components/metaverse/styles/metaverse.styles";
import GlobalNavBar from "@/components/metaverse/globalNavBar/GlobalNavBar";
import MetaverseChatBar from "@/components/metaverse/metaverseChat/metaverseChatBar/MetaverseChatBar";
import MetaversePlayerList from "@/components/metaverse/metaversePlayerList/MetaversePlayerList";
import VideoConference from "@/components/video-conference/VideoConference";
import MetaverseConfigModal from "@/components/metaverse/metaverseConfig/MetaverseConfig";
import ConfirmModal from "@/components/modal/confirmModal/ConfirmModal";
import MetaverseScrumBoard from "@/components/metaverse/metaverseScrumBaord/MetaverseScrumBoard";

function MetaverseComponent() {
  const { isOpen } = useConfirm();
  const isScrumOpen = useMetaverseScrumIsOpenStore.use.isOpen();
  useCreatePhaser();
  return (
    <StMetaverseWrapper>
      <GlobalNavBar />
      <MetaverseChatBar />
      <MetaversePlayerList />
      <StMetaverseMain id="phaser-metaverse" />
      <VideoConference />
      <MetaverseConfigModal />
      {isOpen && <ConfirmModal />}
      {isScrumOpen && <MetaverseScrumBoard />}
    </StMetaverseWrapper>
  );
}

export default MetaverseComponent;
