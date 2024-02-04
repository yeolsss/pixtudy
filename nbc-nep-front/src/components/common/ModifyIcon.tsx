interface Props {
  isActive: boolean
}

const INACTIVE = '#1F2937'
const ACTIVE = '#1F2937'

export default function ModifyIcon({ isActive }: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 10H18V12H17V13H16V14H15V15H14V16H13V17H12V18H11V19H10V20H9V21H8V22H7V23H1V17H2V16H3V15H4V14H5V13H6V12H7V11H8V10H9V9H10V8H11V7H12V6H14V7H15V8H16V9H17V10Z"
        fill={isActive ? ACTIVE : INACTIVE}
      />
      <path
        d="M23 5V7H22V8H21V9H20V10H19V9H18V8H17V7H16V6H15V5H14V4H15V3H16V2H17V1H19V2H20V3H21V4H22V5H23Z"
        fill={isActive ? ACTIVE : INACTIVE}
      />
    </svg>
  )
}
