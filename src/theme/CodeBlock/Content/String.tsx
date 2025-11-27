import { usePrismTheme, useThemeConfig } from '@docusaurus/theme-common'
import {
  containsLineNumbers,
  parseCodeBlockTitle,
  parseLanguage,
  parseLines,
  useCodeWordWrap,
} from '@docusaurus/theme-common/internal'
import { Icon } from '@iconify/react'
import { cn } from '@site/src/lib/utils'
import Container from '@theme/CodeBlock/Container'
import type { Props } from '@theme/CodeBlock/Content/String'
import Line from '@theme/CodeBlock/Line'
import { Highlight, type Language } from 'prism-react-renderer'
import React, { JSX } from 'react'

import styles from './styles.module.css'
import WordWrapButton from '@site/src/theme/CodeBlock/WordWrapButton'
import CopyButton from '@site/src/theme/CodeBlock/CopyButton'

// Prism languages are always lowercase
// We want to fail-safe and allow both "php" and "PHP"
// See https://github.com/facebook/docusaurus/issues/9012
function normalizeLanguage(language: string | undefined): string | undefined {
  return language?.toLowerCase()
}

function parseIcon(metastring?: string): JSX.Element | null {
  const iconRegex = /icon=(?<quote>["'])(?<icon>.*?)\1/

  const icon = metastring?.match(iconRegex)?.groups?.icon ?? ''

  if (icon) {
    return <Icon icon={icon} width="16" />
  }
  return <DefaultFileIcon />
}

function DefaultFileIcon() {
  return (
    <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.625 1.99609H2.25C1.91848 1.99609 1.60054 2.12252 1.36612 2.34757C1.1317 2.57261 1 2.87783 1 3.19609V12.7961C1 13.1144 1.1317 13.4196 1.36612 13.6446C1.60054 13.8697 1.91848 13.9961 2.25 13.9961H9.75C10.0815 13.9961 10.3995 13.8697 10.6339 13.6446C10.8683 13.4196 11 13.1144 11 12.7961V6.19609L6.625 1.99609Z" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 1.99609V7.99609H11" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function CodeBlockString({
  children,
  className: blockClassName = '',
  metastring,
  title: titleProp,
  showLineNumbers: showLineNumbersProp,
  language: languageProp,
}: Props): JSX.Element {
  const {
    prism: { defaultLanguage, magicComments },
  } = useThemeConfig()
  const language = normalizeLanguage(languageProp ?? parseLanguage(blockClassName) ?? defaultLanguage)

  const prismTheme = usePrismTheme()
  const wordWrap = useCodeWordWrap()

  // We still parse the metastring in case we want to support more syntax in the
  // future. Note that MDX doesn't strip quotes when parsing metastring:
  // "title=\"xyz\"" => title: "\"xyz\""
  const title = parseCodeBlockTitle(metastring) || titleProp

  const icon = parseIcon(metastring)

  const { lineClassNames, code } = parseLines(children, {
    metastring,
    language,
    magicComments,
  })
  const showLineNumbers = showLineNumbersProp ?? containsLineNumbers(metastring)

  return (
    <Container
      as="div"
      className={cn(
        blockClassName,
        language && !blockClassName.includes(`language-${language}`) && `language-${language}`,
      )}
    >
      {title && (
        <div className={styles.codeBlockTitle}>
          {icon}
          {title}
          <span style={{ flex: 1, textAlign: 'right' }}>{language}</span>
        </div>
      )}
      <div className={styles.codeBlockContent}>
        <Highlight theme={prismTheme} code={code} language={(language ?? 'text') as Language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              ref={wordWrap.codeBlockRef}
              className={cn(className, styles.codeBlock, 'thin-scrollbar')}
              style={style}
            >
              <code className={cn(styles.codeBlockLines, showLineNumbers && styles.codeBlockLinesWithNumbering)}>
                {tokens.map((line, i) => (
                  <Line
                    key={i}
                    line={line}
                    getLineProps={getLineProps}
                    getTokenProps={getTokenProps}
                    classNames={lineClassNames[i]}
                    showLineNumbers={showLineNumbers}
                  />
                ))}
              </code>
            </pre>
          )}
        </Highlight>
        <div className={styles.buttonGroup}>
          {(wordWrap.isEnabled || wordWrap.isCodeScrollable) && (
            <WordWrapButton
              className={styles.codeButton}
              onClick={() => wordWrap.toggle()}
              isEnabled={wordWrap.isEnabled}
            />
          )}
          <CopyButton className={styles.codeButton} code={code} />
        </div>
      </div>
    </Container>
  )
}
