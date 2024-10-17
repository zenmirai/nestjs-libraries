import { Inject } from "@nestjs/common"
import { FLIP_DECORATOR_PREFIX } from "./constant/flip.constant"

export const InjectDisk = (name: string) => Inject(FLIP_DECORATOR_PREFIX + name)