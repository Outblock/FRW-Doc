import { getLLMText } from '@/lib/get-llm-text';
import source from '@/app/source';

export async function GET() {
  const pages = source.getPages();
  const textPromises = pages.map((page) => getLLMText(page));
  const texts = await Promise.all(textPromises);
  const text = texts.join('\n\n---\n\n');

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
