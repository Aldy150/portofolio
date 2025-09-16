import  { useRef, useEffect, useState, createElement } from 'react';
import type { CSSProperties, FC } from 'react';


import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type AllowedTags = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface SplitTextProps {
  text: string;
  className?: string; // pour Tailwind classes
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines' | string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  tag?: AllowedTags;
  onLetterAnimationComplete?: () => void;
}

type SplitTextElement = HTMLParagraphElement | HTMLHeadingElement;

const SplitText: FC<SplitTextProps> = ({
  text = "",
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete,
}) => {
  const ref = useRef<SplitTextElement | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontsLoaded(true));
  }, []);

  useGSAP(() => {
    if (!ref.current || !text || !fontsLoaded) return;
    const el = ref.current as SplitTextElement & { _rbsplitInstance?: GSAPSplitText | null };

    if (el._rbsplitInstance) {
      try { el._rbsplitInstance.revert(); } catch (_) {}
    }

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign = marginValue === 0 ? '' : marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    let targets: HTMLElement[] = [];
   const assignTargets = (self: GSAPSplitText) => {
  if (splitType.includes('chars') && self.chars?.length) targets = self.chars as HTMLElement[];
  else if (splitType.includes('words') && self.words?.length) targets = self.words as HTMLElement[];
  else if (splitType.includes('lines') && self.lines?.length) targets = self.lines as HTMLElement[];
  else targets = (self.chars || self.words || self.lines || []) as HTMLElement[];
};

    const splitInstance = new GSAPSplitText(el, {
      type: splitType,
      linesClass: 'split-line',
      onSplit: (self) => {
        assignTargets(self);
        gsap.fromTo(targets, { ...from }, {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: { trigger: el, start, once: true },
          onComplete: onLetterAnimationComplete,
          willChange: 'transform, opacity',
        });
      },
    });

    el._rbsplitInstance = splitInstance;

    return () => {
      ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill(); });
      try { el._rbsplitInstance?.revert(); } catch (_) {}
    };
  }, [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), threshold, rootMargin, fontsLoaded, onLetterAnimationComplete]);

  // Style minimal inline pour ce que Tailwind ne couvre pas
  const style: CSSProperties = {
    willChange: 'transform, opacity',
    visibility: fontsLoaded ? 'visible' : 'hidden',
    textAlign,
  };

  // Classes Tailwind + personnalisées
  const classes = `split-parent inline-block overflow-hidden ${className}`;

  return createElement(tag, { ref, style, className: classes }, text);
};

export default SplitText;
