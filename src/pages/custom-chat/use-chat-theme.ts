// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { createContext, useContext, useEffect, useState } from 'react';

// Custom-theme flag, set by CustomChat so deeply-nested shared pieces know which theme is active without prop threading.
export const CustomThemeContext = createContext(false);

export function useIsCustomTheme(): boolean {
  return useContext(CustomThemeContext);
}

// Dark mode detection via the dark-mode class (custom theme paints an inner container, so body background is unreliable).
export function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState(() => {
    const hasDarkClass = (el: HTMLElement) =>
      el.classList.contains('awsui-dark-mode') || el.classList.contains('awsui-polaris-dark-mode');
    return hasDarkClass(document.body) || hasDarkClass(document.documentElement);
  });

  useEffect(() => {
    function detectDarkMode() {
      const hasDarkClass = (el: HTMLElement) =>
        el.classList.contains('awsui-dark-mode') || el.classList.contains('awsui-polaris-dark-mode');
      setIsDark(hasDarkClass(document.body) || hasDarkClass(document.documentElement));
    }

    detectDarkMode();

    const observer = new MutationObserver(detectDarkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}
