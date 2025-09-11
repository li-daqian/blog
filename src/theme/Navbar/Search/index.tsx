import type { Props } from '@theme/Navbar/Search'
import clsx from 'clsx'
import React, { JSX } from 'react'

import styles from './styles.module.css'

export default function NavbarSearch({ children, className }: Props): JSX.Element {
  return <div className={clsx(className, styles.navbarSearchContainer)}>{children}</div>
}
