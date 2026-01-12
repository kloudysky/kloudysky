"use client";

import { useState, useRef, useEffect } from 'react';
import { currentTheme } from '@/lib/themes';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY';

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [particles, setParticles] = useState<{ x: number; y: number; delay: number }[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Generate particles for tech effect
      const newParticles = Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setParticles(newParticles);
    }
  }, [isOpen]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors: { email?: string; message?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!message) {
      newErrors.message = 'Message is required';
    } else if (message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot (bot trap)
    if (honeypotRef.current?.value) {
      return; // Bot detected, silently fail
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          email: email,
          message: message,
          from_name: 'KloudySky Contact Form',
          subject: `New message from ${email}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setEmail('');
        setMessage('');
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const isDark = currentTheme.name === 'dark' || currentTheme.name === 'midnight' || currentTheme.name === 'sunset';
  const bgClass = isDark ? 'bg-black/95' : 'bg-white/95';
  const cardBg = isDark ? 'bg-gray-900/90' : 'bg-gray-100/90';
  const inputBg = isDark ? 'bg-gray-800' : 'bg-white';
  const borderColor = isDark ? 'border-gray-700' : 'border-gray-300';
  const textColor = currentTheme.text;
  const mutedColor = currentTheme.textMuted;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${bgClass} backdrop-blur-sm`}
      onClick={handleBackdropClick}
    >
      {/* Tech particles */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: currentTheme.gridColor,
            opacity: 0.3,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {/* Scanning line effect */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${currentTheme.gridColor}08 50%, transparent 100%)`,
          animation: 'scanline 2s linear infinite',
        }}
      />

      {/* Modal card */}
      <div
        ref={modalRef}
        className={`relative ${cardBg} rounded-lg p-8 w-full max-w-md mx-4 border ${borderColor} shadow-2xl`}
        style={{
          animation: isAnimating ? 'modalEntry 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' : undefined,
          boxShadow: `0 0 60px ${currentTheme.gridColor}20`,
        }}
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: currentTheme.gridColor }} />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: currentTheme.gridColor }} />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: currentTheme.gridColor }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: currentTheme.gridColor }} />

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={`absolute top-4 right-4 ${mutedColor} hover:opacity-70 transition-opacity`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <h2 className={`font-[family-name:var(--font-geist-sans)] font-medium ${textColor} text-2xl mb-6`}>
          Let's Connect<span className="animate-cursor-blink">_</span>
        </h2>

        {/* Success Message */}
        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">✓</div>
            <p className={`${textColor} font-[family-name:var(--font-jetbrains-mono)]`}>
              Message sent successfully!
            </p>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot - hidden from humans, visible to bots */}
            <input
              type="text"
              name="botcheck"
              ref={honeypotRef}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label className={`block ${mutedColor} text-sm mb-1 font-[family-name:var(--font-jetbrains-mono)]`}>
                email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className={`w-full ${inputBg} ${textColor} border rounded px-3 py-2 focus:outline-none transition-colors font-[family-name:var(--font-jetbrains-mono)] text-sm`}
                style={{ borderColor: errors.email ? '#ef4444' : email ? currentTheme.gridColor : undefined }}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 font-[family-name:var(--font-jetbrains-mono)]">{errors.email}</p>
              )}
            </div>

            <div>
              <label className={`block ${mutedColor} text-sm mb-1 font-[family-name:var(--font-jetbrains-mono)]`}>
                message
              </label>
              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (errors.message) setErrors({ ...errors, message: undefined });
                }}
                placeholder="Tell us what's on your mind?"
                rows={4}
                className={`w-full ${inputBg} ${textColor} border rounded px-3 py-2 focus:outline-none transition-colors resize-none font-[family-name:var(--font-jetbrains-mono)] text-sm placeholder:opacity-40`}
                style={{ borderColor: errors.message ? '#ef4444' : message ? currentTheme.gridColor : undefined }}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1 font-[family-name:var(--font-jetbrains-mono)]">{errors.message}</p>
              )}
            </div>

            {submitStatus === 'error' && (
              <p className="text-red-500 text-sm font-[family-name:var(--font-jetbrains-mono)]">
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded font-[family-name:var(--font-jetbrains-mono)] text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                backgroundColor: currentTheme.gridColor,
                color: isDark ? '#000' : '#fff',
              }}
            >
              {isSubmitting ? 'sending...' : 'send_message()'}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        @keyframes modalEntry {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
            filter: blur(10px);
          }
          50% {
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0px);
          }
        }
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}
