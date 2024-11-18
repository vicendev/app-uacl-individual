import { useNavigate } from "react-router-dom";

import { Button } from "../_shared/Button";

interface Props {
  appName: string;
  route: string;
  icon?: string;
}

export default function MenuItem({appName, route, icon = ''}: Props) {
  
  const navigate = useNavigate();

  const goToRoute = () => {
    navigate(route);
  };
  
  return (
    <div>
      <Button onClick={() => goToRoute()}>{appName}</Button>
    </div>
  )
}