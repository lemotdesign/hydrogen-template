/**
 * Strong Subscription Utilities
 * 
 * Utilities for managing subscription products and options.
 * Integrates with Shopify's Selling Plans for subscription management.
 */

export type SubscriptionFrequency = 'weekly' | 'fortnightly' | 'monthly';

export interface SubscriptionOption {
  frequency: SubscriptionFrequency;
  label: string;
  days: number;
  discount: number;
  description: string;
}

/**
 * Available subscription frequencies with their configurations
 */
export const SUBSCRIPTION_OPTIONS: Record<SubscriptionFrequency, SubscriptionOption> = {
  weekly: {
    frequency: 'weekly',
    label: 'Weekly',
    days: 7,
    discount: 15,
    description: 'Delivery every 7 days',
  },
  fortnightly: {
    frequency: 'fortnightly',
    label: 'Fortnightly',
    days: 14,
    discount: 15,
    description: 'Delivery every 14 days',
  },
  monthly: {
    frequency: 'monthly',
    label: 'Monthly',
    days: 30,
    discount: 15,
    description: 'Delivery every 30 days',
  },
};

/**
 * Default subscription discount percentage
 */
export const SUBSCRIPTION_DISCOUNT_PERCENT = 15;

/**
 * Calculate the subscription price based on original price and discount
 */
export function calculateSubscriptionPrice(
  originalPrice: number,
  discountPercent: number = SUBSCRIPTION_DISCOUNT_PERCENT
): number {
  return originalPrice * (1 - discountPercent / 100);
}

/**
 * Format a price for display
 */
export function formatPrice(price: number, currencyCode: string = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
}

/**
 * Calculate annual savings for a subscription
 */
export function calculateAnnualSavings(
  monthlySpend: number,
  discountPercent: number = SUBSCRIPTION_DISCOUNT_PERCENT
): number {
  const monthlyDiscount = monthlySpend * (discountPercent / 100);
  return monthlyDiscount * 12;
}

/**
 * Get subscription benefits list
 */
export function getSubscriptionBenefits(): string[] {
  return [
    `Save ${SUBSCRIPTION_DISCOUNT_PERCENT}% on every order`,
    'Free shipping on all subscription orders',
    'Cancel or pause anytime',
    'Modify your subscription whenever you want',
    'Early access to new products',
    'Exclusive subscriber offers',
  ];
}

/**
 * Subscription selling plan group name for Shopify
 */
export const SELLING_PLAN_GROUP_NAME = 'Subscribe & Save';

/**
 * Check if a product has subscription options available
 * This would integrate with Shopify's Selling Plans API
 */
export function hasSubscriptionOptions(product: {
  sellingPlanGroups?: {nodes: Array<{name: string}>};
}): boolean {
  if (!product.sellingPlanGroups?.nodes) {
    return false;
  }
  return product.sellingPlanGroups.nodes.some(
    (group) => group.name === SELLING_PLAN_GROUP_NAME
  );
}

/**
 * GraphQL fragment for fetching selling plans
 * Use this in your product queries to get subscription data
 */
export const SELLING_PLANS_FRAGMENT = `#graphql
  fragment SellingPlanGroup on SellingPlanGroup {
    name
    options {
      name
      values
    }
    sellingPlans(first: 10) {
      nodes {
        id
        name
        description
        priceAdjustments {
          adjustmentValue {
            ... on SellingPlanPercentagePriceAdjustment {
              adjustmentPercentage
            }
            ... on SellingPlanFixedAmountPriceAdjustment {
              adjustmentAmount {
                amount
                currencyCode
              }
            }
            ... on SellingPlanFixedPriceAdjustment {
              price {
                amount
                currencyCode
              }
            }
          }
          orderCount
        }
        recurringDeliveries
      }
    }
  }
` as const;

/**
 * Interface for a Shopify Selling Plan
 */
export interface SellingPlan {
  id: string;
  name: string;
  description?: string;
  priceAdjustments: Array<{
    adjustmentValue: {
      adjustmentPercentage?: number;
      adjustmentAmount?: {
        amount: string;
        currencyCode: string;
      };
      price?: {
        amount: string;
        currencyCode: string;
      };
    };
    orderCount?: number;
  }>;
  recurringDeliveries: boolean;
}

/**
 * Interface for a Shopify Selling Plan Group
 */
export interface SellingPlanGroup {
  name: string;
  options: Array<{
    name: string;
    values: string[];
  }>;
  sellingPlans: {
    nodes: SellingPlan[];
  };
}

/**
 * Get the subscription price adjustment for a selling plan
 */
export function getSellingPlanDiscount(sellingPlan: SellingPlan): number {
  const firstAdjustment = sellingPlan.priceAdjustments[0];
  if (!firstAdjustment) return 0;
  
  const adjustmentValue = firstAdjustment.adjustmentValue;
  if ('adjustmentPercentage' in adjustmentValue && adjustmentValue.adjustmentPercentage) {
    return adjustmentValue.adjustmentPercentage;
  }
  
  return 0;
}

/**
 * Create line item properties for subscription cart items
 */
export function createSubscriptionLineItem(
  merchandiseId: string,
  quantity: number,
  sellingPlanId: string
): {
  merchandiseId: string;
  quantity: number;
  sellingPlanId: string;
} {
  return {
    merchandiseId,
    quantity,
    sellingPlanId,
  };
}

/**
 * Frequency label mappings for UI display
 */
export const FREQUENCY_LABELS: Record<string, SubscriptionFrequency> = {
  '7 Day': 'weekly',
  '7 Days': 'weekly',
  'Weekly': 'weekly',
  '14 Day': 'fortnightly',
  '14 Days': 'fortnightly',
  'Fortnightly': 'fortnightly',
  '2 Week': 'fortnightly',
  '30 Day': 'monthly',
  '30 Days': 'monthly',
  'Monthly': 'monthly',
  '1 Month': 'monthly',
};

/**
 * Parse a selling plan name to get the frequency
 */
export function parseSellingPlanFrequency(
  planName: string
): SubscriptionFrequency | null {
  const normalizedName = planName.trim();
  
  for (const [key, value] of Object.entries(FREQUENCY_LABELS)) {
    if (normalizedName.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
  return null;
}

