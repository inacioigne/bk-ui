import IconButton from '@mui/material/IconButton';
import Image from 'next/image'

export default function LogoDnb() {
  return (
   <IconButton>
    <Image
      src="/logos/dnb.png"
      width={16}
      height={16}
      alt="dnb"
    />
   </IconButton>
  );
} 