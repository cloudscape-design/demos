// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

export interface MarketPlaceItem {
  id: string;
  name: string;
  vendorName: string;
  rating: number | null;
  numberOfReviews: number | null;
  freeTrial: string;
  yearlyPrice: number;
  pricingModel: string;
  category: string;
  deliveryMethod: string;
  operatingSystem: string;
  region: string;
  architecture: string;
  description: string;
  contractType: string;
}
