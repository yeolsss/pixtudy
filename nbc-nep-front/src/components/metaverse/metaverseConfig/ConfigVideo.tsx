import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DEVICE_STORAGE_KEY } from "@/components/video-conference/constants";
import { LocalStorageDeviceInputs } from "@/types/conference.types";

import { StForm, StSectionMain } from "../styles/config.styles";

export default function ConfigVideo() {
  const [settings, setSettings] = useState<LocalStorageDeviceInputs>();
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    const settingsLocalStorage = JSON.parse(
      localStorage.getItem(DEVICE_STORAGE_KEY) as string
    );

    if (settingsLocalStorage) {
      setSettings(settingsLocalStorage);
    }

    const enumerateDevices = async () => {
      if (!navigator.mediaDevices?.enumerateDevices) {
        toast.error(
          "최신 브라우저를 이용해주세요. (enumerateDevices가 없습니다."
        );
        return Promise.reject(
          new Error("enumerateDevices가 지원되지 않습니다.")
        );
      }

      try {
        const fetchedDevices = await navigator.mediaDevices.enumerateDevices();
        setDevices(fetchedDevices);

        if (!settingsLocalStorage) {
          setSettings({
            audio: {
              deviceId: fetchedDevices.find(
                (device) => device.kind === "audioinput"
              )?.deviceId,
            },
            video: {
              deviceId: fetchedDevices.find(
                (device) => device.kind === "videoinput"
              )?.deviceId,
            },
          });
        }
        // 성공적으로 완료됨을 나타내는 Promise 반환
        return Promise.resolve();
      } catch (error) {
        toast.error(
          "사용 가능한 media device를 불러오는데 에러가 발생했습니다."
        );
        console.error(error);
        // 에러 처리를 위해 Promise.reject 사용
        return Promise.reject(error);
      }
    };

    enumerateDevices();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!settings) return;
    localStorage.setItem(DEVICE_STORAGE_KEY, JSON.stringify(settings));
    toast.success("저장에 성공했습니다.");
  };

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    if (e.target instanceof HTMLSelectElement) {
      if (e.target.name === "audio") {
        setSettings(
          (prev) =>
            ({
              ...prev,
              audio: { deviceId: e.target.value },
            }) as LocalStorageDeviceInputs
        );
      } else if (e.target.name === "video") {
        setSettings(
          (prev) =>
            ({
              ...prev,
              video: { deviceId: e.target.value },
            }) as LocalStorageDeviceInputs
        );
      }
    }
  };

  const audios = devices.filter((device) => device.kind === "audioinput");
  const videos = devices.filter((device) => device.kind === "videoinput");

  return (
    <StSectionMain>
      {devices.length === 0 && <h1>권한이 허용되지 않았습니다.</h1>}
      <StForm onSubmit={handleSubmit} onChange={handleChange}>
        <div>
          <span>오디오 설정</span>
          <select name="audio">
            {audios.map((audio) => (
              <option
                key={`audio${audio.deviceId}`}
                value={audio.deviceId}
                selected={audio.deviceId === settings?.audio.deviceId}
              >
                {audio.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span>비디오 설정</span>
          <select name="video">
            {videos.map((video) => (
              <option
                key={`video${video.deviceId}`}
                value={video.deviceId}
                selected={video.deviceId === settings?.video.deviceId}
              >
                {video.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">저장하기</button>
      </StForm>
      <p>
        아무것도 나타나지 않을 시에는 브라우저 상 카메라, 마이크 권한 설정 후
        새로고침을 해주시길 바랍니다.
      </p>
    </StSectionMain>
  );
}
