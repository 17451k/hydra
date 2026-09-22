/**
 * This fork ships without in-app purchases. There is no purchase, restore, or
 * customer-info flow, so Hydra Pro features stay disabled unless a custom
 * Hydra server is configured.
 */

import { createContext } from "react";

import { USING_CUSTOM_HYDRA_SERVER } from "../constants/HydraServer";

export const TIP_PRODUCT_IDS_IOS = [
  "com.dmilin.hydra.tip.small",
  "com.dmilin.hydra.tip.medium",
  "com.dmilin.hydra.tip.large",
  "com.dmilin.hydra.tip.huge",
] as const;

export type TipProductId = (typeof TIP_PRODUCT_IDS_IOS)[number];

interface SubscriptionContextType {
  purchasesInitialized: boolean;
  customerInfo: null;
  customerId: string | null;
  isPro: boolean;
  buyPro: () => Promise<void>;
  buyTip: (product: unknown) => Promise<boolean>;
  getCustomerInfo: (refresh?: boolean) => Promise<void>;
  restorePurchases: () => Promise<void>;
  proOffering: null;
  tipProducts: null;
  isLoadingProductsAndOfferings: boolean;
  inGracePeriod: boolean;
  gracePeriodEndsAt: number | null;
}

const initialSubscriptionContext: SubscriptionContextType = {
  purchasesInitialized: true,
  customerInfo: null,
  customerId: null,
  isPro: USING_CUSTOM_HYDRA_SERVER,
  buyPro: async () => {},
  buyTip: async () => false,
  getCustomerInfo: async () => {},
  restorePurchases: async () => {},
  proOffering: null,
  tipProducts: null,
  isLoadingProductsAndOfferings: false,
  inGracePeriod: false,
  gracePeriodEndsAt: null,
};

export const SubscriptionsContext = createContext(initialSubscriptionContext);

export function SubscriptionsProvider({ children }: React.PropsWithChildren) {
  return (
    <SubscriptionsContext.Provider value={initialSubscriptionContext}>
      {children}
    </SubscriptionsContext.Provider>
  );
}
