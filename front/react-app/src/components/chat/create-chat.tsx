import { useState } from "react";

interface props {
  projectId : string;
}
export function CreateChat({ projectId }: props) {
  const [content , setContent ] = useState('');
  
}