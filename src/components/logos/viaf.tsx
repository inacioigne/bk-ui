import IconButton from '@mui/material/IconButton';
import Image from 'next/image'

export default function LogoViaf() {
  return (
   <IconButton >
    <Image
      src="/logos/viaf.png"
      width={16}
      height={16}
      alt="viaf"
    />
   </IconButton>
  );
}