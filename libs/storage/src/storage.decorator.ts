import { Inject } from "@nestjs/common"
import { STORAGE_DECORATOR_PREFIX } from "./storage.constant"

export const InjectDisk = (name: string) => Inject(STORAGE_DECORATOR_PREFIX + name)