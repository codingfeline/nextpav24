'use client'

import { Button, Callout, Heading } from '@radix-ui/themes'

const AdminError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <div className="w-full mt-8 max-w-lg mx-auto">
      <div className="space-y-3 p-5 rounded-lg shadow-lg bg-cream-50/95">
        <Heading>Menu Admin</Heading>
        <Callout.Root color="red">
          <Callout.Text>
            Couldn&apos;t load the menu data. This usually means the database is unreachable
            right now.
            {error.message && (
              <span className="block mt-2 font-mono text-xs opacity-80">{error.message}</span>
            )}
          </Callout.Text>
        </Callout.Root>
        <Button onClick={() => reset()} className="!bg-gold !text-white hover:!bg-gold-light">
          Try again
        </Button>
      </div>
    </div>
  )
}

export default AdminError
