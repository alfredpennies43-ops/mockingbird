'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Questionnaire from '@/components/Questionnaire'
import styles from './create.module.css'

export default function CreatePage() {
  return (
    <Suspense fallback={<div className={styles.loading} />}>
      <CreateContent />
    </Suspense>
  )
}

function CreateContent() {
  const params = useSearchParams()
  const success = params.get('success')

  if (success) {
    return (
      <div className={styles.successShell}>
        <div className={styles.successBloom} aria-hidden="true" />
        <div className={styles.successInner}>
          <div className={styles.successEmoji}>🎵</div>
          <h1 className={styles.successTitle}>
            Your song is
            <br />
            being created.
          </h1>
          <p className={styles.successCopy}>Check your inbox in about 15 minutes.</p>
          <Link href="/create" className={styles.successBtn}>
            Create Another Song
          </Link>
        </div>
      </div>
    )
  }

  return <Questionnaire />
}
