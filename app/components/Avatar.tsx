
import Image from "next/image"
import {BiSolidUserPin} from 'react-icons/bi'



interface AvatarProps{
    src?:string  | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
    if(src){
     return   <Image
        src={src}
        alt="Avatar"
        className="rounded-full"
        height="30"
        width="30"
        />
    }
  return (
    <div>
        <BiSolidUserPin size={24}/>

      
    </div>
  )
}

export default Avatar
