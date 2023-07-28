// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
type ConsentCookie = {
  advertising: boolean;
  essential: boolean;
  functional: boolean;
  performance: boolean;
};

export interface CookieConsent {
  checkForCookieConsent: () => void;
  getConsentCookie: () => ConsentCookie;
}
