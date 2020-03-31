jest.mock(`../event-storage`)
import { EventStorage as RealEventStorage } from "../event-storage"
import { Telemetry } from "../telemetry"

let telemetry: Telemetry
let EventStorage: jest.Mock<RealEventStorage>

beforeEach(() => {
  EventStorage = RealEventStorage as jest.Mock<RealEventStorage>
  EventStorage.mockReset()
  telemetry = new Telemetry()
})

describe(`Telemetry`, () => {
  it(`Adds event to store`, () => {
    telemetry.buildAndStoreEvent(`demo`, {})
    expect(EventStorage).toHaveBeenCalledTimes(1)
    expect(EventStorage.mock.instances[0].addEvent).toHaveBeenCalledTimes(1)
  })

  it(`Doesn't add event to store if telemetry tracking is turned off`, () => {
    telemetry.trackingEnabled = false
    telemetry.trackActivity(`demo`)
    expect(EventStorage.mock.instances[0].addEvent).not.toHaveBeenCalled()
  })
})
