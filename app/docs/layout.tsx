import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import source from '@/app/source';
import Image from 'next/image';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="Flow Wallet"
              width={40}
              height={40}
              className="p-1"
            />
            <span className="font-bold">Flow Wallet</span>
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
