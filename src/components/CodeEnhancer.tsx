'use client';

import { useEffect } from 'react';

export default function CodeEnhancer() {
  useEffect(() => {
    // Enhance code blocks after component mounts
    const enhanceCodeBlocks = () => {
      const codeBlocks = document.querySelectorAll('.prose pre code');

      codeBlocks.forEach((codeElement) => {
        const preElement = codeElement.parentElement;

        if (!preElement || preElement.dataset.enhanced) return;

        // Mark as enhanced to avoid reprocessing
        preElement.dataset.enhanced = 'true';

        // Add copy button with icon
        const copyButton = document.createElement('button');

        copyButton.className = 'copy-button';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');

        // Copy icon SVG (Lucide Copy icon)
        const copyIconSVG = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        `;

        // Check icon SVG (Lucide Check icon)
        const checkIconSVG = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        `;

        // X icon SVG (Lucide X icon)
        const xIconSVG = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        `;

        // Set initial copy icon
        copyButton.innerHTML = copyIconSVG;

        copyButton.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(codeElement.textContent || '');
            // Show checkmark icon briefly
            copyButton.innerHTML = checkIconSVG;
            setTimeout(() => {
              // Return to copy icon
              copyButton.innerHTML = copyIconSVG;
            }, 2000);
          } catch (err) {
            console.error('Failed to copy text: ', err);
            // Show error icon briefly
            copyButton.innerHTML = xIconSVG;
            setTimeout(() => {
              // Return to copy icon
              copyButton.innerHTML = copyIconSVG;
            }, 2000);
          }
        });

        preElement.appendChild(copyButton);

        // Try to detect language from content patterns
        const content = codeElement.textContent || '';
        let language = '';
        let langClass = '';

        if (
          content.includes('interface ') ||
          content.includes(': string') ||
          content.includes(': number') ||
          content.includes('@Component') ||
          content.includes('signal(') ||
          content.includes('export class')
        ) {
          language = 'TypeScript';
          langClass = 'typescript';
        } else if (
          content.includes('function ') ||
          content.includes('const ') ||
          content.includes('console.log')
        ) {
          language = 'JavaScript';
          langClass = 'javascript';
        } else if (
          content.includes('npm ') ||
          content.includes('pnpm ') ||
          content.includes('#!/')
        ) {
          language = 'Bash';
          langClass = 'bash';
        } else if (content.includes('{') && content.includes('}') && content.includes('"')) {
          language = 'JSON';
          langClass = 'json';
        }

        // Add language label if detected
        if (language) {
          const langLabel = document.createElement('span');

          langLabel.className = `language-label ${langClass}`;
          langLabel.textContent = language;
          preElement.appendChild(langLabel);
        }
      });
    };

    // Run on mount and after any dynamic content changes
    enhanceCodeBlocks();

    // Re-run when new content is added (for client-side navigation)
    const observer = new MutationObserver((mutations) => {
      let shouldRerun = false;

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          const hasCodeBlocks = Array.from(mutation.addedNodes).some(
            (node) =>
              node instanceof Element &&
              (node.querySelector?.('.prose pre code') || node.matches?.('.prose pre code')),
          );

          if (hasCodeBlocks) shouldRerun = true;
        }
      });
      if (shouldRerun) enhanceCodeBlocks();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null; // This component doesn't render anything
}
