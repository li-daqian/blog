import { cn } from '@site/src/lib/utils'
import type { Props } from '@theme/CodeBlock/Line'

import styles from './styles.module.css'
import { JSX } from 'react'

export default function CodeBlockLine({
  line,
  classNames,
  showLineNumbers,
  getLineProps,
  getTokenProps,
}: Props): JSX.Element {
  if (line.length === 1 && line[0]?.content === '\n') {
    line[0]!.content = ''
  }

  const lineProps = getLineProps({
    line,
    className: cn(classNames, showLineNumbers && styles.codeLine),
  })

  const lineTokens = line.map((token, key) => {
    const { key: _key, ...tokenProps } = getTokenProps({ token, key })
    return <span key={key} {...tokenProps} />
  })

  return (
    <span {...lineProps}>
      {showLineNumbers
        ? (
            <>
              <span className={styles.codeLineNumber} />
              <span className={styles.codeLineContent}>{lineTokens}</span>
            </>
          )
        : (
            lineTokens
          )}
      <br />
    </span>
  )
}
