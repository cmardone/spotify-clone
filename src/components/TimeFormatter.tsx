import clsx from "clsx";

interface Props {
  time: number
  className?: string
}
const TimeFormatter = ({ time, className } : Props) => {
  const minutes = Math.floor(time / 60).toString().padStart(2, "0")
  const seconds = Math.round(time % 60).toString().padStart(2, "0")

  return (
    <span className={clsx({ [className!]: className })}>
      {(Number.isNaN(time) || time === 0) && "00:00"}
      {!(Number.isNaN(time) || time === 0) && `${minutes}:${seconds}`}
    </span>
  )
}

export default TimeFormatter
