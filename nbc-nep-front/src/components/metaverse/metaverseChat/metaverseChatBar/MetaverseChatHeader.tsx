import Image from "next/image";
import { times } from "@/assets/GNB";
import { StMetaverseDmHeader } from "@/components/metaverse/styles/metaverse.styles";

interface Props {
  title: string;
  subtitle?: string;
  handler: () => void;
}
export default function MetaverseChatHeader({
  title,
  subtitle,
  handler,
}: Props) {
  return (
    <StMetaverseDmHeader>
      <h1>{title}</h1>
      {subtitle && <h2>To. {subtitle}</h2>}
      <button type="button" onClick={handler}>
        <Image src={times} alt="close" width={12} height={12} />
      </button>
    </StMetaverseDmHeader>
  );
}

MetaverseChatHeader.defaultProps = {
  subtitle: "",
};
