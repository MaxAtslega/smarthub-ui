import {webSocketService} from "@/services/webSocketService";

function General() {
  return (
    <div>
      <h1>General</h1>

      <button className={"mt-4"} onClick={() => {
        webSocketService.sendMessage(JSON.stringify({
          t: "REBOOT",
          op: 0
        }))
      }}>REBOOT</button>

    </div>
  )
}

export default General
