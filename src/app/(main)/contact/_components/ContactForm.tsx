"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  Loader2Icon,
  ChevronDownIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { services } from "@/constants/services";
import { easeOut } from "@/utils/motion";

type Status = "idle" | "submitting" | "success";

const CALL_OPTION = "Book a discovery call";
const needOptions = [
  ...services.map((s) => s.title),
  CALL_OPTION,
  "Not sure yet",
] as const;

const formSchema = z.object({
  name: z.string().min(1, "Please tell us your name."),
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("Enter a valid email address."),
  phone: z
    .string()
    .min(1, "Please enter your phone number.")
    .regex(/^\+?[\d\s-]{7,}$/, "Enter a valid phone number."),
  need: z.string().min(1, "Choose what you need help with."),
  message: z
    .string()
    .min(10, "A sentence or two helps us prepare (min. 10 characters)."),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [dynamicServices, setDynamicServices] = useState<any[]>([]);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", need: "", message: "" },
    mode: "onChange",
  });

  useEffect(() => {
    import("@/lib/api/client").then(({ api }) => {
      api
        .getServices()
        .then((res: any) => {
          if (res.data) setDynamicServices(res.data);
        })
        .catch(console.error);
    });
  }, []);

  const currentNeedOptions =
    dynamicServices.length > 0
      ? [...dynamicServices.map((s) => s.title), CALL_OPTION, "Not sure yet"]
      : needOptions;

  useEffect(() => {
    const serviceSlug = params?.get("service");
    const topic = params?.get("topic");

    // Check dynamic services first, fallback to static
    const sourceServices =
      dynamicServices.length > 0 ? dynamicServices : services;
    const match = sourceServices.find((s) => s.slug === serviceSlug);

    if (match) setValue("need", match.title);
    else if (topic === "call") setValue("need", CALL_OPTION);
  }, [params, setValue, dynamicServices]);

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    try {
      const { api } = await import("@/lib/api/client");

      let serviceId = undefined;
      const match = dynamicServices.find((s) => s.title === values.need);
      if (match) {
        serviceId = match._id || match.id;
      }

      const payload = { ...values, serviceId };
      const res = await api.submitContact(payload);

      setStatus("success");
      toast.success(res?.message || "Message sent successfully!");
    } catch (error: any) {
      setStatus("idle");
      toast.error(error?.message || "Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    reset();
    setStatus("idle");
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: easeOut }}
          className="rounded-[28px] border border-line-accent bg-surface p-8 sm:p-12"
          role="status"
        >
          <CheckCircle2Icon aria-hidden className="h-10 w-10 text-cyan" />
          <h2 className="mt-6 font-display text-3xl font-bold tracking-[-0.03em] text-white">
            Thanks — we&apos;ve got it.
          </h2>
          <p className="mt-3 max-w-md text-fg-2">
            We&apos;ll reply within one working day. For anything urgent,
            message us on WhatsApp.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-8 min-h-11 text-sm font-medium text-cyan transition-colors duration-200 hover:text-cyan-soft"
          >
            Send another inquiry
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-8"
        >
          <div className="grid gap-8 sm:grid-cols-2">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Field id="name" label="Name" error={errors.name?.message}>
                  <input
                    id="field-name"
                    type="text"
                    autoComplete="name"
                    {...field}
                    {...fieldProps(!!errors.name)}
                  />
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field id="email" label="Email" error={errors.email?.message}>
                  <input
                    id="field-email"
                    type="email"
                    autoComplete="email"
                    {...field}
                    {...fieldProps(!!errors.email)}
                  />
                </Field>
              )}
            />
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Field id="phone" label="Phone" error={errors.phone?.message}>
                  <input
                    id="field-phone"
                    type="tel"
                    autoComplete="tel"
                    {...field}
                    {...fieldProps(!!errors.phone)}
                  />
                </Field>
              )}
            />
            <Controller
              name="need"
              control={control}
              render={({ field }) => (
                <Field
                  id="need"
                  label="What do you need help with?"
                  error={errors.need?.message}
                >
                  <CustomSelect
                    value={field.value}
                    onChange={field.onChange}
                    options={currentNeedOptions}
                    hasError={!!errors.need}
                  />
                </Field>
              )}
            />
          </div>

          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <Field
                id="message"
                label="Message"
                error={errors.message?.message}
              >
                <textarea
                  id="field-message"
                  rows={4}
                  {...field}
                  {...fieldProps(!!errors.message)}
                />
              </Field>
            )}
          />

          <div className="flex flex-wrap items-center gap-4">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              arrow={!isSubmitting}
              icon={
                isSubmitting ? (
                  <Loader2Icon aria-hidden className="h-4 w-4 animate-spin" />
                ) : undefined
              }
            >
              {isSubmitting ? "Sending…" : "Send Inquiry"}
            </Button>
            <p className="text-sm text-fg-3">
              We reply within one working day.
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function CustomSelect({
  value,
  onChange,
  options,
  hasError,
}: {
  value: string;
  onChange: (val: string) => void;
  options: readonly string[];
  hasError: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between resize-none appearance-none rounded-none border-0 border-b bg-transparent px-0 py-3 text-lg text-left focus:outline-none focus:ring-0 ${
          value ? "text-white" : "text-fg-3"
        } ${hasError ? "border-[#FF8A8A]" : "border-line"}`}
      >
        <span>{value || "Choose one"}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-fg-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-[calc(100%+8px)] z-50 w-full max-h-60 overflow-auto rounded-xl border border-line bg-[#052d35] p-2 shadow-2xl custom-scrollbar"
          >
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-[15px] transition-colors duration-200 ${
                    value === option
                      ? "bg-cyan/10 text-cyan font-medium"
                      : "text-white hover:bg-surface-hover"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={`field-${id}`}
        className="block text-sm font-medium text-fg-2"
      >
        {label}
      </label>
      <div className="group relative mt-2">
        {children}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-cyan transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-focus-within:scale-x-100"
        />
      </div>
      {error && (
        <p id={`error-${id}`} className="mt-2 text-sm text-[#FF8A8A]">
          {error}
        </p>
      )}
    </div>
  );
}

function fieldProps(hasError: boolean) {
  return {
    "aria-invalid": hasError,
    className: `block w-full resize-none appearance-none rounded-none border-0 border-b bg-transparent px-0 py-3 text-lg text-white placeholder:text-fg-3 focus:outline-none focus:ring-0 focus-visible:outline-none ${
      hasError ? "border-[#FF8A8A]" : "border-line"
    }`,
  };
}
