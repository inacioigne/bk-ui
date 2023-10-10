import IconButton from '@mui/material/IconButton';
import Image from 'next/image'

export default function LogoPurl() {
  return (
   <IconButton>
    <Image
      src="/logos/purl.png"
      width={16}
      height={16}
      alt="purl"
    />
   </IconButton>
  );
} 