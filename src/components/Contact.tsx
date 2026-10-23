import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { PAGE_BANNERS } from '../constants';
import { CONTACT_EMAIL, CONTACT_FORM_ENDPOINT, emailDraftUrl, submitContact } from '../lib/contact';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'email-ready'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const submitting = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting.current) return;
    if (!CONTACT_FORM_ENDPOINT) {
      window.location.href = emailDraftUrl(formData);
      setStatus('email-ready');
      return;
    }
    submitting.current = true;
    setErrorMessage('');
    setStatus('submitting');
    try {
      await submitContact(CONTACT_FORM_ENDPOINT, formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setErrorMessage(error instanceof Error && error.name !== 'AbortError'
        ? error.message
        : 'We could not confirm delivery. Please check your connection or email us directly.');
      setStatus('error');
    } finally {
      submitting.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-studio-bg">
      {/* Banner Section */}
      <section className="relative h-[70vh] flex items-end px-6 md:px-12 lg:px-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-studio-bg via-studio-bg/25 to-transparent z-10" />
          <img
            src={PAGE_BANNERS.contact}
            className="w-full h-full object-cover opacity-90"
            alt="Contact Banner"
            referrerPolicy="no-referrer"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-20 max-w-3xl"
        >
          <span className="text-studio-accent font-mono text-sm tracking-widest uppercase mb-3 block">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-4 leading-none text-studio-ink">
            Let's Start a <br />
            <span className="text-studio-accent">Conversation</span>
          </h1>
          <p className="text-base md:text-lg text-studio-ink/75 font-serif italic max-w-xl leading-relaxed">
            Whether you have a specific project in mind or just want to explore the possibilities of digital art and animation, we're here to help.
          </p>
        </motion.div>
      </section>

      <div className="pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="text-xl text-studio-ink/60 font-serif italic mb-12 leading-relaxed">
              Whether you have a specific project in mind or just want to explore the possibilities of digital art and animation, we're here to help.
            </p>

            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="flex items-start gap-6 group"
              >
                <div className="p-4 bg-studio-ink/5 rounded-2xl group-hover:bg-studio-accent/10 transition-colors">
                  <Mail className="w-6 h-6 text-studio-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-widest text-studio-ink/40 mb-1">Email Us</h3>
                  <a href="mailto:hello@sourceiistudio.com" className="text-xl font-bold hover:text-studio-accent transition-colors text-studio-ink">
                    hello@sourceiistudio.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="flex items-start gap-6 group"
              >
                <div className="p-4 bg-studio-ink/5 rounded-2xl group-hover:bg-studio-accent/10 transition-colors">
                  <Phone className="w-6 h-6 text-studio-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-widest text-studio-ink/40 mb-1">Call Us</h3>
                  <p className="text-xl font-bold text-studio-ink">+92 335 3077806</p>
                </div>
              </motion.div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="flex items-start gap-6 group"
              >
                <div className="p-4 bg-studio-ink/5 rounded-2xl group-hover:bg-studio-accent/10 transition-colors">
                  <MapPin className="w-6 h-6 text-studio-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-widest text-studio-ink/40 mb-1">Studio Location</h3>
                  <p className="text-xl font-bold text-studio-ink">Global Digital Studio <br /> <span className="text-studio-ink/40 font-normal text-lg">Remote-First Workflow</span></p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-studio-ink/5 p-8 md:p-12 rounded-3xl border border-studio-ink/10"
          >
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-studio-accent mb-6" />
                </motion.div>
                <h2 className="text-3xl font-bold uppercase mb-4">Message Submitted</h2>
                <p role="status" className="text-studio-ink/60 mb-8">Thank you for reaching out. Your enquiry has been accepted. Our team will reply by email.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-8 py-4 bg-studio-accent text-white font-bold uppercase tracking-wider hover:bg-studio-ink hover:text-studio-bg transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit} 
                className="space-y-6"
                aria-busy={status === 'submitting'}
              >
                {!CONTACT_FORM_ENDPOINT && (
                  <p className="text-sm text-studio-ink/70 leading-relaxed">
                    Fill in your project details, then open an email draft and press Send in your email app.
                    You can also email <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a> directly.
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-mono uppercase tracking-widest text-studio-ink/40 ml-1">Full Name</label>
                    <input 
                      required
                      name="name"
                      id="contact-name"
                      autoComplete="name"
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-studio-ink/5 border border-studio-ink/10 rounded-xl px-6 py-4 focus:outline-none focus:border-studio-accent transition-colors text-studio-ink"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-mono uppercase tracking-widest text-studio-ink/40 ml-1">Email Address</label>
                    <input 
                      required
                      name="email"
                      id="contact-email"
                      autoComplete="email"
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full bg-studio-ink/5 border border-studio-ink/10 rounded-xl px-6 py-4 focus:outline-none focus:border-studio-accent transition-colors text-studio-ink"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-xs font-mono uppercase tracking-widest text-studio-ink/40 ml-1">Subject</label>
                  <input 
                    required
                    name="subject"
                    id="contact-subject"
                    type="text" 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry"
                    className="w-full bg-studio-ink/5 border border-studio-ink/10 rounded-xl px-6 py-4 focus:outline-none focus:border-studio-accent transition-colors text-studio-ink"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-mono uppercase tracking-widest text-studio-ink/40 ml-1">Message</label>
                  <textarea 
                    required
                    name="message"
                    id="contact-message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    className="w-full bg-studio-ink/5 border border-studio-ink/10 rounded-xl px-6 py-4 focus:outline-none focus:border-studio-accent transition-colors text-studio-ink resize-none"
                  />
                </div>
                <button 
                  disabled={status === 'submitting'}
                  type="submit"
                  className="w-full py-5 bg-studio-accent text-white font-bold uppercase tracking-widest hover:bg-studio-ink hover:text-studio-bg transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {status === 'submitting' ? 'Sending...' : CONTACT_FORM_ENDPOINT ? 'Send Message' : 'Open Email Draft'}
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                {status === 'error' && (
                  <p role="alert" className="text-red-700 text-sm text-center mt-4">{errorMessage}{' '}
                    <a href={emailDraftUrl(formData)} className="underline">Email your enquiry instead</a>.
                  </p>
                )}
                {status === 'email-ready' && (
                  <p role="status" className="text-studio-ink/70 text-sm mt-4">
                    Your message has not been sent from this website. Press Send in your email app.
                    If no app opened, copy your details and email <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
                    Your details are still here.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  </div>
  );
}

