"use client"

interface MenuItemProps{
    callback:() => void,
    label:string
}
const menuItem:React.FC<MenuItemProps> = ({callback, label}) => {
  return (
    <div onClick={callback} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold text-center">{label}</div>
  )
}

export default menuItem