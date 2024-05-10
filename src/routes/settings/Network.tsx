import {useSelector} from "react-redux";
import {getInterfacesData} from "@/slices/network.slice";

function Network() {
  const interfaces = useSelector(getInterfacesData);

  return (
    <div>
      <h1>Network</h1>

      <p>Interfaces:</p>
      <ul>
        {interfaces.map((inter) => <li>
          <span className={"break-words"}>{JSON.stringify(inter)}</span>
        </li>)}
      </ul>

    </div>
  )
}

export default Network
