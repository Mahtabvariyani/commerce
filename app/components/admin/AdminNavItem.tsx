import { IconType } from "react-icons";

interface AdminItemProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}

const AdminNavItem: React.FC<AdminItemProps> = ({ selected, icon:Icon, label }) => {
  return <div
  
  className={`flex items-center justify-center gap-1 text-center border-b-2 hover:text-slate-800 transition cursor-pointer ${selected ? 'border-b-slate-800 text-slate-800' : 'border-transparent text-slate-500'}`}
  >
    <Icon />
    <div 
    className="font-medium text-sm text-center break-normal"
    > {label} </div>


  </div>;
};

export default AdminNavItem;
