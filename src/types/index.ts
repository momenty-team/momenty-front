export type BridgeRoute = string;

export interface BridgeData {
  route?: BridgeRoute;
  bottomSheet?: {
    name: string;
    state: 'open' | 'close';
    webviewRoute?: string;
  };
}
