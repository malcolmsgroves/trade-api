export const ENV: {
  ALPACA_ENDPOINT: string;
  APCA_API_SECRET_KEY: string;
  APCA_API_KEY_ID: string;
} = {
  ALPACA_ENDPOINT: process.env.ALPACA_ENDPOINT || "",
  APCA_API_KEY_ID: process.env.APCA_API_KEY_ID || "",
  APCA_API_SECRET_KEY: process.env.APCA_API_SECRET_KEY || ""
};
