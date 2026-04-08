import Translate, { translate } from '@docusaurus/Translate'
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common'
import useIsBrowser from '@docusaurus/useIsBrowser'
import IconDarkMode from '@theme/Icon/DarkMode'
import IconLightMode from '@theme/Icon/LightMode'
import type { Props } from '@theme/Navbar/ColorModeToggle'
import React, { JSX } from 'react'
import styles from './styles.module.css'

export default function NavbarColorModeToggle({ className }: Props): JSX.Element | null {
  const navbarStyle = useThemeConfig().navbar.style
  const disabled = useThemeConfig().colorMode.disableSwitch
  const { colorMode, setColorMode } = useColorMode()
  const isBrowser = useIsBrowser()

  const nextColorMode = colorMode === 'dark' ? 'light' : 'dark'
  const title = translate({
    message: colorMode === 'dark' ? 'dark mode' : 'light mode',
    id: colorMode === 'dark' ? 'theme.colorToggle.ariaLabel.mode.dark' : 'theme.colorToggle.ariaLabel.mode.light',
    description: 'The name for the current color mode',
  })

  if (disabled) {
    return null
  }

  return (
    <div className={`${styles.toggle} ${className ?? ''}`.trim()}>
      <button
        type="button"
        className={`clean-btn ${styles.toggleButton} ${navbarStyle === 'dark' ? styles.darkNavbarColorModeToggle : ''}`.trim()}
        disabled={!isBrowser}
        title={title}
        aria-label={title}
        onClick={() => setColorMode(nextColorMode)}
      >
        {colorMode === 'dark'
          ? <IconDarkMode aria-hidden className={styles.toggleIcon} />
          : <IconLightMode aria-hidden className={styles.toggleIcon} />}
        <span className={styles.srOnly}>
          <Translate
            id="theme.colorToggle.switchLabel"
            description="The label for the color mode toggle button"
            values={{ mode: nextColorMode }}
          >
            {'Switch to {mode} mode'}
          </Translate>
        </span>
      </button>
    </div>
  )
}
