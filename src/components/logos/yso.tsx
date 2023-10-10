import IconButton from '@mui/material/IconButton';
import Image from 'next/image'

export default function LogoYso() {
  return (
   <IconButton>
    <Image
      src="/logos/yso.png"
      width={16}
      height={16}
      alt="yso"
    />
   </IconButton>
  );
} 