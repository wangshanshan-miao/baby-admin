import { EventEmitter } from "@/frame/utils";

type Events = 'get-layout' | 'get-items'

const dragEvent = new EventEmitter<Events>()

export {
  dragEvent
}
