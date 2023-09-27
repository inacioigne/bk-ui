import IconButton from '@mui/material/IconButton';
import Image from 'next/image'

export default function LogoIsni() {
  return (
   <IconButton >
    <Image
      src="/logos/isni.png"
      width={25}
      height={16}
      alt="isni"
    />
    {/* <img src="/logos/loc_icon.png" alt="loc" /> */}
   </IconButton>
  );
}