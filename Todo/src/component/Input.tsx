import { ReactSetState } from "./Types/Utils"

type Input = {
    inputValue:string,
    setInputValue:ReactSetState<string>,
    type:'checkbox'|'text'|'color'
}

export const Input = ({type,inputValue,setInputValue}:Input) => {
  return (
    <input value={inputValue} type={type}
    onChange={(e) => setInputValue(e.target.value)} 
    className="w-full p-2 rounded-sm mb-2 bg-gray-400 text-black"/>
)
}
