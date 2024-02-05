interface Props {
  fill: number;
}

const USER_EXISTS = "#15E42A";
const USER_NOT_EXISTS = "#FF001F";

function UserIcon({ fill }: Props) {
  return (
    <svg
      width="8"
      height="9"
      viewBox="0 0 8 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_117_689)">
        <path
          d="M2.33333 3.49998H2V2.16665H2.33333V1.49998H2.66667V1.16665H3.33333V0.833313H4.66667V1.16665H5.33333V1.49998H5.66667V2.16665H6V3.49998H5.66667V4.16665H5.33333V4.49998H4.66667V4.83331H3.33333V4.49998H2.66667V4.16665H2.33333V3.49998Z"
          fill={fill ? USER_EXISTS : USER_NOT_EXISTS}
        />
        <path
          d="M7.33342 6.83333V7.83333H7.00008V8.16667H1.00008V7.83333H0.666748V6.83333H1.00008V6.5H1.33341V6.16667H1.66675V5.83333H2.33341V5.5H5.66675V5.83333H6.33342V6.16667H6.66675V6.5H7.00008V6.83333H7.33342Z"
          fill={fill ? USER_EXISTS : USER_NOT_EXISTS}
        />
      </g>
      <defs>
        <clipPath id="clip0_117_689">
          <rect
            width="8"
            height="8"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default UserIcon;
