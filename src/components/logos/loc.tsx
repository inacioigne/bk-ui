import IconButton from '@mui/material/IconButton';
import Image from 'next/image'

export default function LogoLoc() {
  return (
   <IconButton >
    <Image
      src="/logos/loc_icon.png"
      width={20}
      height={16}
      alt="loc"
    />
   </IconButton>
  );
}