import VolumeFull from "./VolumeFull";
import VolumeLow from "./VolumeLow";
import VolumeMid from "./VolumeMid";
import VolumeMuted from "./VolumeMuted";

interface Props {
  volume: number;
}

const VolumeIcon = ({ volume }: Props) => {
  if (volume > 0.75) return <VolumeFull />
  if (volume > 0.35) return <VolumeMid />
  if (volume > 0) return <VolumeLow />
  return <VolumeMuted />
}

export default VolumeIcon
