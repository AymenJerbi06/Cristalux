'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';

type ContactTopic = 'buyer' | 'order' | 'wholesale' | 'promotion' | 'private-label' | 'media';

type FormState = {
  name: string;
  email: string;
  company: string;
  topic: ContactTopic;
  orderNumber: string;
  message: string;
};

type SubmissionState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; reference: string }
  | { status: 'error'; message: string };

const topics: { value: ContactTopic; label: string }[] = [
  { value: 'buyer', label: 'Individual buyer' },
  { value: 'order', label: 'Order support' },
  { value: 'wholesale', label: 'Wholesale buyer' },
  { value: 'promotion', label: 'Promotion / deal request' },
  { value: 'private-label', label: 'Private label / manufacturing' },
  { value: 'media', label: 'Media / collaboration' },
];

const initialForm: FormState = {
  name: '',
  email: '',
  company: '',
  topic: 'buyer',
  orderNumber: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [submission, setSubmission] = useState<SubmissionState>({ status: 'idle' });

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) {
        return;
      }

      const rawTopic = new URLSearchParams(window.location.search).get('topic') as ContactTopic | null;
      if (rawTopic && topics.some((topic) => topic.value === rawTopic)) {
        setForm((current) => ({ ...current, topic: rawTopic }));
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const topicNeedsOrder = form.topic === 'order';
  const topicNeedsBusinessContext = form.topic === 'wholesale' || form.topic === 'promotion' || form.topic === 'private-label';
  const canSubmit = useMemo(
    () => form.name.trim().length > 1 && form.email.includes('@') && form.message.trim().length >= 12,
    [form.email, form.message, form.name],
  );

  const updateField = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (submission.status !== 'idle') {
      setSubmission({ status: 'idle' });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit || submission.status === 'submitting') {
      return;
    }

    setSubmission({ status: 'submitting' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const payload = await response.json() as { ok?: boolean; reference?: string; error?: string };

      if (!response.ok || !payload.ok || !payload.reference) {
        setSubmission({
          status: 'error',
          message: payload.error ?? 'Something went wrong. Please review the form and try again.',
        });
        return;
      }

      setSubmission({ status: 'success', reference: payload.reference });
      setForm((current) => ({
        ...initialForm,
        topic: current.topic,
      }));
    } catch {
      setSubmission({
        status: 'error',
        message: 'The message could not be sent right now. Please try again in a moment.',
      });
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-grid">
        <label>
          <span>Name</span>
          <input
            name="name"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label>
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label>
          <span>{topicNeedsBusinessContext ? 'Business or brand' : 'Business, optional'}</span>
          <input
            name="company"
            value={form.company}
            onChange={(event) => updateField('company', event.target.value)}
            autoComplete="organization"
            placeholder={topicNeedsBusinessContext ? 'Store, salon, brand, or partner name' : 'Only if relevant'}
          />
        </label>
        <label>
          <span>Topic</span>
          <select
            name="topic"
            value={form.topic}
            onChange={(event) => updateField('topic', event.target.value as ContactTopic)}
          >
            {topics.map((topic) => (
              <option key={topic.value} value={topic.value}>{topic.label}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{topicNeedsOrder ? 'Order number' : 'Order number, optional'}</span>
          <input
            name="orderNumber"
            value={form.orderNumber}
            onChange={(event) => updateField('orderNumber', event.target.value)}
            placeholder={topicNeedsOrder ? 'Required for faster support' : 'Only if relevant'}
            required={topicNeedsOrder}
          />
        </label>
      </div>

      <label className="contact-message">
        <span>Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          rows={7}
          minLength={12}
          required
          placeholder={topicNeedsBusinessContext ? 'Tell us about the quantities, timing, offer, audience, or deal you have in mind.' : 'Tell us what you need help with.'}
        />
      </label>

      <div className="contact-form-actions">
        <button type="submit" disabled={!canSubmit || submission.status === 'submitting'}>
          {submission.status === 'submitting' ? 'Sending...' : 'Send message'}
        </button>
        {submission.status === 'success' && (
          <p role="status">Message received. Reference: {submission.reference}</p>
        )}
        {submission.status === 'error' && (
          <p role="alert">{submission.message}</p>
        )}
      </div>

      <style>{`
        .contact-form {
          display: grid;
          gap: 22px;
        }
        .contact-form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }
        .contact-form label {
          display: grid;
          gap: 8px;
        }
        .contact-form span {
          color: #6a6a64;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .contact-form input,
        .contact-form select,
        .contact-form textarea {
          width: 100%;
          border: 1px solid #d9d9d2;
          background: #fff;
          color: #111;
          font: inherit;
          font-size: 14px;
          letter-spacing: 0;
          outline: none;
        }
        .contact-form input,
        .contact-form select {
          min-height: 48px;
          padding: 0 14px;
        }
        .contact-form textarea {
          min-height: 180px;
          padding: 14px;
          resize: vertical;
        }
        .contact-form-actions {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }
        .contact-form button {
          min-height: 48px;
          border: 1px solid #111;
          background: #111;
          color: #fff;
          cursor: pointer;
          padding: 0 24px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .contact-form button:disabled {
          cursor: not-allowed;
          opacity: 0.55;
        }
        .contact-form-actions p {
          margin: 0;
          color: #34342f;
          font-size: 14px;
          line-height: 1.6;
          letter-spacing: 0;
        }
        @media (max-width: 767px) {
          .contact-form-grid {
            grid-template-columns: 1fr;
          }
          .contact-form-actions {
            display: grid;
          }
          .contact-form button {
            width: 100%;
          }
        }
      `}</style>
    </form>
  );
}
