import { PROCESS_ENV_DEVELOPMENT } from "../../../CONSTANTS";
import * as dotenv from "dotenv";

import chromium from "@sparticuz/chromium";

dotenv.config();

const ENV_STATE = process.env.NODE_ENV;

export const initExecutalbePath = async () => {
  const executablePath: string =
    ENV_STATE === PROCESS_ENV_DEVELOPMENT
      ? "/snap/bin/chromium"
      : await chromium.executablePath();

  return executablePath;
};
