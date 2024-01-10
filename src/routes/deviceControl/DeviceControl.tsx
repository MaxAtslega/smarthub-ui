import { webSocketService } from '@/services/webSocketService';

function DeviceControl() {
    return (
      <div>
        <h1>DeviceControl</h1>

        <div className={"w-[100%]"}>
          <button className={"mt-2 mr-2"} onClick={() => controlLED("RED")}>RED LED</button>
          <button className={"mt-2 mr-2"} onClick={() => controlLED("GREEN")}>GREEN LED</button>
          <button className={"mt-2"} onClick={() => controlLED("BLUE")}>BLUE LED</button>
        </div>
      </div>
    )
}

function controlLED(color: String) {
  webSocketService.sendMessage(JSON.stringify({
    t: "FLASH_LED",
    op: 0,
    d: {
      "color": color
    }
  }))
}

export default DeviceControl
