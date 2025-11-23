import { isDark } from '@lib';
import cx from 'classnames';
import { FunctionComponent, useMemo, useState } from 'react';
import { ChevronDown } from 'react-feather';
import styles from '../styles/faq.module.scss';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: FunctionComponent = () => {
  const isDarkMode = useMemo(() => isDark(), []);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Why is React Creme only 55kb when other libraries are 200kb+?',
      answer: 'We use CSS Modules instead of CSS-in-JS (which adds 20-40kb of runtime), avoid heavy dependencies, and optimize every component for tree-shaking. No design system lock-in means no extra theme engine overhead.',
    },
    {
      question: 'Does React Creme work with React 19?',
      answer: 'Yes! React Creme is built specifically for React 19 and uses the latest features. We also maintain backward compatibility with React 18 for gradual migrations.',
    },
    {
      question: 'How do I customize the theme?',
      answer: 'React Creme uses CSS variables for theming. You can override design tokens globally or use the ThemeProvider for component-level customization. No need to rebuild or configure complex theme objects.',
    },
    {
      question: 'Is it production-ready?',
      answer: 'Absolutely. React Creme has 95%+ test coverage, WCAG AA accessibility compliance, and is used in production by companies worldwide. Every component is battle-tested and documented.',
    },
    {
      question: 'How does tree-shaking work?',
      answer: 'React Creme is built as ESM modules with sideEffects: false. Import only what you need and your bundler (Webpack, Vite, etc.) will automatically remove unused code, keeping your bundle small.',
    },
    {
      question: 'Can I migrate from Material-UI or Ant Design?',
      answer: 'Yes, migration is straightforward. While component APIs differ, React Creme provides similar functionality with better performance. We recommend gradual migration, replacing components one at a time.',
    },
    {
      question: 'What about TypeScript support?',
      answer: 'React Creme is written in TypeScript 5.9 with strict mode enabled. All components have full type definitions, and you\'ll get excellent IntelliSense in VS Code and other editors.',
    },
    {
      question: 'Is there enterprise support available?',
      answer: 'React Creme is open-source and MIT licensed. For enterprise support, custom components, or consulting, please reach out through our GitHub repository.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={cx(styles.faq_section, isDarkMode ? styles.dark : '')}>
      <div className={styles.faq_container}>
        <div className={styles.section_header}>
          <h2 className={styles.section_title}>Frequently Asked Questions</h2>
          <p className={styles.section_subtitle}>
            Everything you need to know about React Creme
          </p>
        </div>

        <div className={styles.faq_list}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cx(
                styles.faq_item,
                openIndex === index && styles.active
              )}
            >
              <button
                className={styles.faq_question}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.question_text}>{faq.question}</span>
                <ChevronDown
                  className={cx(
                    styles.chevron,
                    openIndex === index && styles.rotated
                  )}
                  size={20}
                />
              </button>
              {openIndex === index && (
                <div className={styles.faq_answer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.faq_cta}>
          <h3 className={styles.cta_title}>Still have questions?</h3>
          <p className={styles.cta_text}>
            Check out our documentation or join the discussion on GitHub
          </p>
        </div>
      </div>
    </section>
  );
};

export { FAQ };
