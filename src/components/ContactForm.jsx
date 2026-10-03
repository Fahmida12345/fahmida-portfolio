import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { cn } from '../lib/cn'
import { Button } from './ui/Button'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@company.com' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', placeholder: 'Project enquiry' },
]

const EMPTY = { name: '', email: '', subject: '', message: '' }

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please enter your name.'
  else if (values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'

  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Enter a valid email address.'

  if (!values.subject.trim()) errors.subject = 'Please add a subject.'
  else if (values.subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters.'

  if (!values.message.trim()) errors.message = 'Please write a message.'
  else if (values.message.trim().length < 20)
    errors.message = 'Message must be at least 20 characters — add a little more detail.'

  return errors
}

export function ContactForm() {
  const formId = useId()
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')
  const messageRef = useRef(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (touched[name]) {
      setErrors(validate({ ...values, [name]: value }))
    }
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors(validate(values))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error')
      setFeedback('Please fix the highlighted fields and try again.')
      const firstInvalid = Object.keys(nextErrors)[0]
      document.getElementById(`${formId}-${firstInvalid}`)?.focus()
      return
    }

    setStatus('submitting')
    setFeedback('')

    if (profile.contactEndpoint) {
      try {
        const response = await fetch(profile.contactEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(values),
        })
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)

        setStatus('success')
        setFeedback('Thanks — your message has been sent. I will reply as soon as I can.')
        setValues(EMPTY)
        setTouched({})
        return
      } catch {
        setStatus('error')
        setFeedback('The message could not be sent right now. Please email me directly instead.')
        return
      }
    }

    const subject = encodeURIComponent(`Portfolio enquiry — ${values.subject.trim()}`)
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n—\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}`,
    )

    setStatus('success')
    setFeedback('Opening your email client with the message pre-filled — press send to deliver it.')
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    messageRef.current?.focus()
  }

  const fieldClass = (invalid) =>
    cn(
      'w-full rounded-xl border bg-surface-2 px-3.5 py-3 text-[14.5px] text-ink placeholder:text-muted/60',
      'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40',
      invalid
        ? 'border-red-500/70 focus:border-red-500'
        : 'border-line hover:border-line-2 focus:border-accent',
    )

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const invalid = Boolean(touched[field.name] && errors[field.name])
          const errorId = `${formId}-${field.name}-error`

          return (
            <div key={field.name} className="flex flex-col gap-2">
              <label
                htmlFor={`${formId}-${field.name}`}
                className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted"
              >
                {field.label}
              </label>
              <input
                id={`${formId}-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={invalid || undefined}
                aria-describedby={invalid ? errorId : undefined}
                className={fieldClass(invalid)}
              />
              {invalid ? (
                <p id={errorId} className="flex items-center gap-1.5 text-[12.5px] text-red-500">
                  <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                  {errors[field.name]}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={`${formId}-message`}
          className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted"
        >
          Message
        </label>
        <textarea
          ref={messageRef}
          id={`${formId}-message`}
          name="message"
          rows={5}
          placeholder="Tell me about the project, timeline or role…"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={Boolean(touched.message && errors.message) || undefined}
          aria-describedby={
            touched.message && errors.message ? `${formId}-message-error` : `${formId}-message-hint`
          }
          className={cn(fieldClass(Boolean(touched.message && errors.message)), 'resize-y')}
        />
        {touched.message && errors.message ? (
          <p id={`${formId}-message-error`} className="flex items-center gap-1.5 text-[12.5px] text-red-500">
            <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
            {errors.message}
          </p>
        ) : (
          <p id={`${formId}-message-hint`} className="text-[12.5px] text-muted/80">
            {values.message.trim().length} / 20 characters minimum
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              Send Message
            </>
          )}
        </Button>

        <p className="text-[12.5px] text-muted/80">
          Or email{' '}
          <a
            href={`mailto:${profile.email}`}
            className="-mx-1 inline-block rounded px-1 py-1.5 text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {profile.email}
          </a>
        </p>
      </div>

      <div aria-live="polite">
        {feedback ? (
          <p
            className={cn(
              'flex items-start gap-2.5 rounded-xl border px-4 py-3 text-[13.5px] leading-relaxed',
              status === 'success'
                ? 'border-accent/30 bg-accent-soft text-accent'
                : 'border-red-500/30 bg-red-500/10 text-red-500',
            )}
          >
            {status === 'success' ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            )}
            <span>{feedback}</span>
          </p>
        ) : null}

        {!profile.contactEndpoint ? (
          <p className="mt-3 text-[12px] leading-relaxed text-muted/70">
            This form is not connected to a backend yet — submitting opens a pre-filled email in your
            mail client. Set <code className="font-mono text-muted">contactEndpoint</code> in{' '}
            <code className="font-mono text-muted">src/data/profile.js</code> to send submissions
            directly.
          </p>
        ) : null}
      </div>
    </form>
  )
}