import IconButton from '@mui/material/IconButton';
import Image from 'next/image'

export default function LogoBnf() {
  return (
   <IconButton>
    <Image
      src="/logos/bnf.png"
      width={16}
      height={16}
      alt="bnf"
    />
   </IconButton>
  );
} 