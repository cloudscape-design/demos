// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
/**
 * Valid system environment values
 * - 'console': AWS Console theme
 * - 'core': AWS Core theme
 * - 'external': Public Cloudscape demos
 */
export type SystemEnvironment = 'console' | 'core' | 'external';

/**
 * Gets the current system environment from process.env.SYSTEM
 * Returns 'console' if SYSTEM is not set
 */
export function getSystem(): SystemEnvironment {
  return (process.env.SYSTEM as SystemEnvironment) || 'console';
}

/**
 * Checks if the current system is external (public Cloudscape demos)
 * Use this function to check if features should be enabled for public demos.
 */
export function isExternalSystem(): boolean {
  return process.env.SYSTEM === 'external';
}

/**
 * Checks if the current system is internal (AWS Console or Core)
 * Use this function to check if features should be enabled for internal AWS systems.
 */
export function isInternalSystem(): boolean {
  return process.env.SYSTEM !== 'external';
}
