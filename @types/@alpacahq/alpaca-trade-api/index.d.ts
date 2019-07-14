declare module "@alpacahq/alpaca-trade-api" {
  type Hook<S = undefined, T = undefined> = (
    callback: (arg1?: S, arg2?: T) => void
  ) => void;

  type Channel = 'trade_updates' | 'account_updates' | 'T.' | 'Q.' | 'A.' | 'AM.';


  interface AlpacaWebSocket {
    connect: () => void;  // Connect to the alpaca server using websocket.
    subscribe: (channels: Channel[]) => void; // Subscribe to the alpaca server and possibly Polygon server. This will unsubscribe from any previously subscribed channels. trade_updates and account_updates are for the alpaca server, the rest are for the Polygon server. In order to make calls to the Polygon api, you must have opened your Alpaca brokerage account. Otherwise Polygon's api will be unavailable.
    onConnect: Hook;
    onDisconnect: Hook;
    onStateChange: Hook<any>;
    onOrderUpdate: Hook<any>; // Register callback function for the channel 'trade_updates'.
    onAccountUpdate: Hook<any>; // Register callback function for the channel 'account_updates'.
    onStockTrades: Hook<any, any>; // Register callback function for the channel 'T.*'.
    onStockQuotes: Hook<any, any>; // Register callback function for the channel 'Q.*'.
    onStackAggSec: Hook<any, any>; // Register callback function for the channel 'A.*'.
    onStockAggMin: Hook<any, any>; // Register callback function for the channel 'AM.*'.
  }
  interface AlpacaAccount {}
  interface AlpacaOrder {}
  interface AlpacaPosition {}
  interface AlpacaAsset {}
  interface AlpacaCalendar {}
  interface AlpacaBars {}

  class Alpaca {
    readonly websocket: AlpacaWebSocket;

    constructor(params: {
      keyId?: string;
      secretKey?: string;
      paper?: boolean;
    });

    // Accounts
    getAccount: () => Promise<AlpacaAccount>;

    // Orders
    createOrder: (
      req: {
        symbol?: string; // any valid ticker symbol
        qty?: number;
        side?: "buy" | "sell";
        type?: "market" | "limit" | "stop" | "stop_limit";
        time_in_force?: "day" | "gtc" | "opg" | "ioc";
        limit_price?: number;
        stop_price?: number;
        client_order_id?: string; // optional
      }
    ) => Promise<AlpacaOrder>;
    getOrders: (
      options: {
        status?: "open" | "closed" | "all";
        after?: Date;
        until?: Date;
        limit?: number;
        direction?: "asc" | "desc";
      }
    ) => Promise<AlpacaOrder[]>;
    getOrder: (orderId: string) => Promise<AlpacaOrder>;
    getOrderByClientOrderId: (clientOrderId: string) => Promise<AlpacaOrder>;
    cancelOrder: (orderId: string) => Promise<void>;

    // Positions
    getPosition: (symbol: string) => Promise<AlpacaPosition>;
    getPositions: () => Promise<AlpacaPosition[]>;

    // Assets
    getAssets: (
      options: {
        status?: "active" | "inactive";
        asset_class?: string;
      }
    ) => Promise<AlpacaAsset[]>;
    getAsset: (symbol: string) => Promise<AlpacaAsset>;

    // Calendar
    getCalendar: (req: { start: Date; end: Date }) => Promise<AlpacaCalendar[]>;

    // Data
    getBars: (
      bucket: "minute" | "1Min" | "5Min" | "15Min" | "day" | "1D",
      symbol: string | string[], // which ticker symbols to get bars for
      options: {
        limit: number;
        start: Date;
        end: Date;
        after: Date;
        until: Date;
      }
    ) => Promise<AlpacaBars>;
  }

  export = Alpaca;
}
