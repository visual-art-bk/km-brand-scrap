import {initPlaywright} from './init/initPlaywright'

const WebActionService = {
    init: async () => {
        await initPlaywright()
    }
}

export default WebActionService