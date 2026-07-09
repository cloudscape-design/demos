# Accessibility Review: Theme Changes from Cloudscape Baseline

This document lists all visual token changes introduced in the new theme (`generateThemeConfig` / "After") compared to the original Cloudscape visual foundation (`generateThemeConfigConsole` / "Before"), which has been validated for accessibility compliance.

The changes are grouped by category to help reviewers efficiently identify areas that may need further review.

An initial accessibility validation has been conducted using the axe DevTools Chrome extension, and no automated violations were detected. This document is intended to support a more thorough expert review beyond what automated tooling can cover.

Color values are annotated with their Cloudscape base color primitive name where applicable (e.g. `grey-800`, `blue-600`).

---

## 1. Color Contrast — Text & Interactive Elements

### Links

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `colorTextLinkDefault` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | `#656871` (grey-600) / `#B4B4BB` (grey-400) | Shift from blue to grey. |
| `colorTextLinkHover` | `#002A66` (blue-900) / `#75CFFF` (blue-300) | `#06080A` (grey-1000) / `#FFFFFF` (grey-0) | Shift from blue to grey extremes. |
| `colorTextAccent` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | `#1b232d` (grey-800) / `#F9F9FB` (grey-100) | Shift from blue to neutral grey. |
| `colorTextLinkButtonNormalDefault` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | `#1b232d` (grey-800) / `#F9F9FB` (grey-100) | Shift from blue to neutral grey. |

### Buttons — Normal (border + text on background)

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `colorBorderButtonNormalDefault` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | `#1b232d` (grey-800) / `#f3f3f7` (grey-200) | Shift from blue to neutral grey. |
| `colorTextButtonNormalDefault` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | `#1b232d` (grey-800) / `#f3f3f7` (grey-200) | Shift from blue to neutral grey. |
| `colorBorderButtonNormalHover` | `#002A66` (blue-900) / `#75CFFF` (blue-300) | Accent (customizable) | Depends on custom accent color. |
| `colorTextButtonNormalHover` | `#002A66` (blue-900) / `#75CFFF` (blue-300) | Accent (customizable) | Depends on custom accent color. |
| `colorBackgroundButtonNormalHover` | `#F0FBFF` (blue-50) / `#1B232D` (grey-800) | `#F6F6F9` (grey-150) / `#333843` (grey-700) | Shift from blue tint to neutral grey. |
| `colorBackgroundButtonNormalActive` | `#D1F1FF` (blue-100) / `#333843` (grey-700) | `#EBEBF0` (grey-250) / `#131920` (grey-900) | Shift from blue tint to neutral grey. |
| Token will be introduced: `colorTextButtonInlineIconDefault` | Cloudscape default | `#1b232d` (grey-800) / `#F9F9FB` (grey-100) | Shift to neutral grey. |

### Buttons — Primary (text on filled background)

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `colorBackgroundButtonPrimaryDefault` | `#FF9900` (amber-400) / `#FFB347` (amber-300) | `#1b232d` (grey-800) / `#F9F9FB` (grey-100) | Shift from amber to neutral grey. |
| `colorBackgroundButtonPrimaryHover` | `#FA6F00` (amber-500) / `#FFC870` | `#06080A` (grey-1000) / `#FFFFFF` (grey-0) | Shift from amber to grey extremes. |
| `colorTextButtonPrimaryDefault` | `#0F141A` (grey-950) / `#0F141A` (grey-950) | `#ffffff` (grey-0) / `#131920` (grey-900) | Text color inverted to match new background. |

### Buttons — Link variant (tertiary)

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `colorBackgroundButtonLinkHover` | `#F0FBFF` (blue-50) / `#1B232D` (grey-800) | `#EBEBF0` (grey-250) / `#424650` (grey-650) | Shift from blue tint to neutral grey. |
| Token will be introduced: `colorBackgroundButtonLinkDefault` | `transparent` | `#F6F6F9` (grey-150) / `#232B37` (grey-750) | Added filled background. |

### Toggle Buttons

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `colorBackgroundToggleButtonNormalPressed` | `#D1F1FF` (blue-100) / `#333843` (grey-700) | `#EBEBF0` (grey-250) / `#131920` (grey-900) | Shift from blue tint to neutral grey. |
| `colorBorderToggleButtonNormalPressed` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | Accent | Depends on custom accent color. |
| `colorTextToggleButtonNormalPressed` | `#002A66` (blue-900) / `#75CFFF` (blue-300) | Accent | Depends on custom accent color. |

### Controls (Checkboxes, Radio, Toggle switches)

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `colorBackgroundControlChecked` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | Accent: `#1b232d` (grey-800) / `#F9F9FB` (grey-100) | Shift from blue to neutral grey. |

### Breadcrumbs

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `colorTextBreadcrumbCurrent` | `#656871` (grey-600) / `#8c8c94` (grey-500) | Accent: `#1b232d` (grey-800) / `#F9F9FB` (grey-100) | Shift from muted grey to darker/lighter grey. |

### Side Navigation

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| Token will be introduced: `colorTextNavigationItemDefault` | Cloudscape default | `#1b232d` (grey-800) / `#c6c6cd` | Text color changed. |

---

## 2. Color Contrast — Status & Notifications

### Notification Banners

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `colorBackgroundNotificationGreen` | `#00802F` (green-600) / `#2BB534` (green-500) | `#008559` (mint-600) / `#008559` (mint-600) | Shift from green to mint. |
| `colorBackgroundNotificationBlue` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | `#0033CC` (indigo-800) / `#0033CC` (indigo-800) | Shift from blue to indigo, same value for both modes. |

### Status Text

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `colorTextStatusInfo` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | `#0033CC` (indigo-800) / `#7598FF` (indigo-400) | Shift from blue to indigo. |

### Alert Backgrounds

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| Info bg | `#F0FBFF` (blue-50) / `#001129` (blue-1000) | `#f6f6f9` (grey-150) / `#232b37` (grey-750) | Shift from blue tint to neutral grey. |
| Warning bg | `#FFFEF0` (yellow-50) / `#191100` (yellow-1000) | `#f6f6f9` (grey-150) / `#232b37` (grey-750) | Shift from yellow tint to neutral grey. |
| Error bg | `#FFF5F5` (red-50) / `#1F0000` (red-1000) | `#f6f6f9` (grey-150) / `#232b37` (grey-750) | Shift from red tint to neutral grey. |
| Success bg | `#EFFFF1` (green-50) / `#001401` (green-1000) | `#f6f6f9` (grey-150) / `#232b37` (grey-750) | Shift from green tint to neutral grey. |
| `colorTextStatusInfo` (alert) | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | `#0033CC` (indigo-800) / `#7598FF` (indigo-400) | Shift from blue to indigo. |
| `colorBorderStatusInfo` (alert) | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | `#0033CC` (indigo-800) / `#7598FF` (indigo-400) | Shift from blue to indigo. |
| `borderWidthAlert` | `2px` | `0px` | Border removed. |

---

## 3. Typography — Readability & Legibility

### Font Family

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `fontFamilyBase` | `var(--font-amazon-ember, 'Amazon Ember', sans-serif)` | `'Noto Sans', 'Helvetica Neue', Roboto, Arial, sans-serif` | Different typeface. |

### Heading Sizes & Weights

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| H1 size / line-height | `24px` / `30px` | `28px` / `32px` | Larger size and line-height. |
| H2 size / line-height | `20px` / `24px` | `22px` / `26px` | Larger size and line-height. |
| H3 line-height | `22px` | `24px` | Increased line-height. |
| H5 line-height | `18px` | `20px` | Increased line-height. |
| `fontWeightDisplayL` | `700` | Not set | Weight removed. |
| All heading weights | `700` (always) | `600` (or `700` if Ember Modern) | Reduced weight. |
| `fontWeightButton` | `700` | `600` | Reduced weight. |
| Token will be introduced: `fontWeightBoxValueLarge` | `700` | `600` | Reduced weight. |
| Token will be introduced: `fontWeightAlertHeader` | `700` | `600` | Reduced weight. |
| Token will be introduced: `fontSizeTabLabel` | Cloudscape default | `14px` | Font size changed. |
| Token will be introduced: `fontWeightTabLabel` | Cloudscape default | `600` | Reduced weight. |

---

## 4. Border Width — Touch Targets & Visual Affordance

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `borderWidthButton` | `2px` | `1px` | Reduced width. |
| `borderWidthToken` | `2px` | `1px` | Reduced width. |
| `borderWidthAlert` | `2px` | `0px` | Border removed. |
| `borderItemWidth` | `2px` | `1px` | Reduced width. |
| Token will be introduced: Alert `border-inline-start-width` | Uses `borderWidthAlert` (uniform) | `2px` (left side only) | Directional border added. |

---

## 5. Border Radius — Shape Language

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `borderRadiusAlert` | `12px` | `2px` | Reduced radius. |
| `borderRadiusButton` | `20px` (pill) | `8px` | Reduced radius. |
| `borderRadiusContainer` | `16px` | `12px` | Reduced radius. |
| `borderRadiusDropzone` | `12px` | `8px` | Reduced radius. |
| `borderRadiusFlashbar` | `12px` | `4px` | Reduced radius. |
| `borderRadiusTabsFocusRing` | `20px` | `10px` | Reduced radius. |
| `borderRadiusTutorialPanelItem` | `8px` | `4px` | Reduced radius. |
| Token will be introduced: `borderRadiusPanelTrigger` | Cloudscape default | `8px` | Radius changed. |

---

## 6. Icon Stroke Width — Visibility at Small Sizes

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| Small | `2px` | `1.5px` | Reduced stroke. |
| Normal | `2px` | `1.5px` | Reduced stroke. |
| Medium | `2px` | `2px` | No change. |
| Big | `3px` | `2px` | Reduced stroke. |
| Large | `4px` | `2.5px` | Reduced stroke. |

---

## 7. Focus & Selection Indicators

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| `colorBorderItemFocused` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | Accent: `#1b232d` (grey-800) / `#F9F9FB` (grey-100) | Shift from blue to neutral grey. |
| `colorBorderItemSelected` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | Accent | Shift from blue to neutral grey. |
| `colorBackgroundItemSelected` | `#F0FBFF` (blue-50) / `#001129` (blue-1000) | `#F6F6F9` (grey-150) / `#06080A` (grey-1000) | Shift from blue tint to neutral grey. |
| `colorBackgroundLayoutToggleSelectedDefault` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | Accent | Shift from blue to neutral grey. |
| `colorBackgroundSegmentActive` | `#006CE0` (blue-600) / `#42B4FF` (blue-400) | Accent | Shift from blue to neutral grey. |

---

## 8. Spacing & Padding

| Token | Before (Cloudscape) | After (New Theme) | Review Notes |
|---|---|---|---|
| Token will be introduced: `spaceButtonHorizontal` | Cloudscape default | `12px` | Padding changed. |
| Token will be introduced: `spaceButtonVertical` | Cloudscape default | `5px` | Padding changed. |
| Token will be introduced: `spaceAlertVertical` | Cloudscape default | `4px` | Padding changed. |
| Token will be introduced: `spaceAlertHorizontal` | Cloudscape default | `12px` | Padding changed. |
| Token will be introduced: `spaceLayoutContentTop` | Cloudscape default | `24px` | Margin changed. |

---

## 9. Component Style Bug Fixes (No Accessibility Impact Expected)

These are corrections to existing Cloudscape component rendering issues, not intentional visual changes.

| Component | Description |
|---|---|
| Button icon (left) | Icon position adjustment (`inset-inline-start: -2px`) removed. |
| Button icon (right) | Icon position adjustment (`inset-inline-end: 0px`) removed. |
| Segmented Control | Selected segment `border-radius: 6px` fixed. |
| Toolbar | Unnecessary top border hidden (`border-color: transparent`). |

---

## Summary of Changes

1. Link colors shift from blue to grey.
2. All four alert types share a single neutral grey background with no border.
3. Focus ring shifts from blue to neutral grey.
4. Heading weights reduced from 700 to 600. Button weight reduced from 700 to 600.
5. Interactive element borders reduced from 2px to 1px. Alert border removed.
6. Icon stroke widths reduced across most sizes.
7. Several tokens resolve to a customizable accent color (default grey-800 / grey-100).
8. Button vertical padding set to 5px.
9. Link-variant buttons have a filled grey background.
10. Alert headers weight reduced to 600 with tighter padding.
11. Tab label size set to 14px, weight reduced to 600.
12. Side navigation text color changed to grey-800 / `#c6c6cd`.
