import useSocket from "@/hooks/socket/useSocket";
import useAuth from "@/zustand/authStore";
import { PlayerState } from "../metaverse/types/metaverse";

export default function PlayerStateSelector() {
  const { id } = useAuth((state) => state.user);
  const { changePlayerState } = useSocket({ namespace: "/metaverse" });

  const handleChangeState = (state: PlayerState) => () => {
    console.log("click");
    changePlayerState(id, state);
  };

  return (
    <ul>
      <li onClick={handleChangeState(PlayerState.ONLINE)}>온라인</li>
      <li onClick={handleChangeState(PlayerState.EATING)}>식사</li>
      <li onClick={handleChangeState(PlayerState.LEFT_SEAT)}>자리비움</li>
      <li onClick={handleChangeState(PlayerState.DISTURB)}>방해금지</li>
    </ul>
  );
}
