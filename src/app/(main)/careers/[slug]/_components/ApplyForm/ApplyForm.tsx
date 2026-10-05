"use client";

import React, { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, Loader2Icon } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FormField, fieldProps } from '@/components/form/FormField/FormField';
import { CustomSelect } from '@/components/form/CustomSelect/CustomSelect';
import { ACCEPTED_CV_TYPES, FileDropzone, MAX_CV_SIZE } from './_components/FileDropzone/FileDropzone';
import { ApplySuccess } from './_components/ApplySuccess/ApplySuccess';
import { easeOut } from '@/utils/motion';
import type { Job } from '@/types/content';

const noticeOptions = ['Immediately', '2 weeks', '1 month', '2 months', '3 months or more'] as const;

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.'),
  email: z.email('Enter a valid email address.'),
  phone: z.string().trim().regex(/^\+?[\d\s-]{7,}$/, 'Enter a valid phone number.'),
  portfolio: z.union([z.literal(''), z.url('Enter a valid URL (include https://).')]),
  salary: z.string().optional(),
  notice: z.string().min(1, 'Choose your notice period.'),
  cv: z.
  custom<File | null>().
  refine((f) => Boolean(f && f instanceof File), 'Please upload your CV.').
  refine((f) => !f || f.size <= MAX_CV_SIZE, 'File is too large — max 5 MB.').
  refine((f) => !f || ACCEPTED_CV_TYPES.includes(f.type), 'Only PDF, DOC or DOCX files are allowed.'),
  cover: z.string().max(2000, 'Keep it under 2000 characters.').optional(),
  consent: z.boolean().refine((v) => v, 'Please accept to continue.')
});

type Values = z.infer<typeof schema>;

const defaults: Values = {
  name: '',
  email: '',
  phone: '',
  portfolio: '',
  salary: '',
  notice: '',
  cv: null,
  cover: '',
  consent: false
};

export function ApplyForm({ job }: {job: Job;}) {
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: defaults });

  const coverLength = useWatch({ control, name: 'cover' })?.length ?? 0;

  const onSubmit = async (values: Values) => {
    try {
      // TODO: replace with RTK Query mutation (multipart/form-data) when the API is ready.
      await new Promise((r) => window.setTimeout(r, 1400));
      setSubmittedName(values.name);
      toast.success('Application submitted successfully!');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    reset(defaults);
    setSubmittedName(null);
  };

  return (
    <section id="apply" aria-labelledby="apply-title" className="scroll-mt-20 bg-navy py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="lg:col-span-4">
            
            <p className="inline-flex items-center gap-2 text-sm font-medium text-cyan">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan" />
              Apply now
            </p>
            <h2
              id="apply-title"
              className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1] tracking-[-0.04em] text-white">
              
              Ready to <span className="text-cyan">join us?</span>
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-fg-2">
              Tell us a bit about yourself and attach your CV. It takes less than 3 minutes.
            </p>
            <ul className="mt-8 space-y-3 text-[15px] text-fg-2">
              {['We read every application', 'Reply within 5–7 working days', 'Your data stays private'].map((t) =>
              <li key={t} className="flex items-center gap-3">
                  <CheckIcon aria-hidden className="h-4 w-4 text-cyan" />
                  {t}
                </li>
              )}
            </ul>
          </motion.div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              {submittedName !== null ?
              <ApplySuccess key="success" name={submittedName} jobTitle={job.title} onReset={handleReset} /> :

              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: easeOut }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-9 rounded-[28px] border border-line bg-surface p-6 sm:p-10">
                
                  <div className="grid gap-9 sm:grid-cols-2">
                    <FormField id="name" label="Full name" required error={errors.name?.message}>
                      <input id="field-name" type="text" autoComplete="name" placeholder="Your name" {...register('name')} {...fieldProps(!!errors.name)} />
                    </FormField>
                    <FormField id="email" label="Email" required error={errors.email?.message}>
                      <input id="field-email" type="email" autoComplete="email" placeholder="you@example.com" {...register('email')} {...fieldProps(!!errors.email)} />
                    </FormField>
                    <FormField id="phone" label="Phone" required error={errors.phone?.message}>
                      <input id="field-phone" type="tel" autoComplete="tel" placeholder="+880 1XXX-XXXXXX" {...register('phone')} {...fieldProps(!!errors.phone)} />
                    </FormField>
                    <FormField id="portfolio" label="LinkedIn / Portfolio" error={errors.portfolio?.message}>
                      <input id="field-portfolio" type="url" placeholder="https://" {...register('portfolio')} {...fieldProps(!!errors.portfolio)} />
                    </FormField>
                    <FormField id="salary" label="Expected salary (BDT)" error={errors.salary?.message}>
                      <input id="field-salary" type="text" placeholder="e.g. 60,000 / month" {...register('salary')} {...fieldProps(!!errors.salary)} />
                    </FormField>
                    <Controller
                    name="notice"
                    control={control}
                    render={({ field }) =>
                    <FormField id="notice" label="Notice period" required error={errors.notice?.message}>
                          <CustomSelect
                        id="field-notice"
                        value={field.value}
                        onChange={field.onChange}
                        options={noticeOptions}
                        hasError={!!errors.notice} />
                      
                        </FormField>
                    } />
                  
                  </div>

                  <Controller
                  name="cv"
                  control={control}
                  render={({ field }) =>
                  <FormField id="cv" label="CV / Resume" required error={errors.cv?.message}>
                        <FileDropzone id="field-cv" value={field.value} onChange={field.onChange} hasError={!!errors.cv} />
                      </FormField>
                  } />
                

                  <FormField id="cover" label="Why do you want to join DSZ?" error={errors.cover?.message}>
                    <textarea
                    id="field-cover"
                    rows={4}
                    placeholder="A few lines about you, your best work and what excites you about this role…"
                    {...register('cover')}
                    {...fieldProps(!!errors.cover)} />
                  
                  </FormField>
                  <p className="-mt-6 text-right text-xs tabular-nums text-fg-3">{coverLength}/2000</p>

                  <div>
                    <label className="group flex cursor-pointer items-start gap-3 text-[15px] text-fg-2">
                      <input type="checkbox" className="peer sr-only" {...register('consent')} />
                      <span
                      aria-hidden
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-200 peer-checked:border-cyan peer-checked:bg-cyan peer-focus-visible:ring-2 peer-focus-visible:ring-cyan [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100 ${
                      errors.consent ? 'border-[#FF8A8A]' : 'border-line group-hover:border-line-accent'}`
                      }>
                      
                        <CheckIcon className="h-3.5 w-3.5 text-navy transition-opacity" strokeWidth={3} />
                      </span>
                      <span>I agree that Digital Soft Zone may store my details to process this application.</span>
                    </label>
                    {errors.consent && <p className="mt-2 text-sm text-[#FF8A8A]">{errors.consent.message}</p>}
                  </div>

                  <div className="flex flex-col-reverse items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-fg-3">
                      Applying for <span className="text-white">{job.title}</span>
                    </p>
                    <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    arrow={!isSubmitting}
                    icon={isSubmitting ? <Loader2Icon aria-hidden className="h-4 w-4 animate-spin" /> : undefined}>
                    
                      {isSubmitting ? 'Submitting…' : 'Submit application'}
                    </Button>
                  </div>
                </motion.form>
              }
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>);

}
