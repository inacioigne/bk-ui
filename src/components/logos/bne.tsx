import IconButton from '@mui/material/IconButton';
import Image from 'next/image'

export default function LogoBne() {
  return (
   <IconButton>
    <Image
      src="/logos/bne.png"
      width={16}
      height={16}
      alt="wikidata"
    />
   </IconButton>
  );
} 