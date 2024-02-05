import useChatAlarm from "@/hooks/GNB/useChatAlarm";
import { StSectionChatConfig } from "../styles/config.styles";

export default function ConfigSpaceChat() {
  const options = [
    { text: "Blop", src: "/assets/alarm/Blop.mp3" },
    { text: "Cycle", src: "/assets/alarm/Cycle.mp3" },
    { text: "Pling", src: "/assets/alarm/Pling.mp3" },
  ];

  const { sound, setAlarmSound, setAlarmPlayStatus, setAlarmVolume, volume } =
    useChatAlarm();

  const handleChangeSound = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlarmSound(e.target.value);
    setAlarmPlayStatus(true);
  };
  const handleTestSound = () => {
    setAlarmPlayStatus(true);
  };
  const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    let volumeValue = Number(e.target.value);
    if (volumeValue < 0) volumeValue = 0;
    if (volumeValue > 100) volumeValue = 100;
    setAlarmVolume(volumeValue);
  };
  return (
    <StSectionChatConfig>
      <h1>DM 효과음 설정</h1>
      <div>
        <h2>효과음 변경</h2>
        <div>
          <select defaultValue={sound} onChange={handleChangeSound}>
            {options.map((option, index) => (
              <option key={`${index + option.src}`} value={option.src}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <h2>볼륨조절</h2>
        <div>
          <input
            type="range"
            onChange={handleChangeVolume}
            value={volume}
            min={0}
            max={100}
            step={1}
          />
          <input
            type="number"
            onChange={handleChangeVolume}
            value={volume}
            max={100}
            min={0}
            step={1}
          />
        </div>

        <button type="button" onClick={handleTestSound}>
          테스트
        </button>
      </div>
    </StSectionChatConfig>
  );
}
