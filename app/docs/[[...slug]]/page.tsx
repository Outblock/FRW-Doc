import source from '@/app/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Pencil } from 'lucide-react';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <a
        href={`https://github.com/onflow/FRW-doc/blob/main/content${page.url.replace('/docs', '')}.mdx`}
        rel="noreferrer noopener"
        target="_blank"
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-md text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors mb-4 w-fit"
      >
        <Pencil className="w-3 h-3" />
        Edit
      </a>
      <div className="border-t border-fd-border mb-6" />
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
