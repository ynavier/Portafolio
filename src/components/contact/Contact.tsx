import React, { useState, useEffect } from "react";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";
import NotificationToast from "./NotificationToast";
import AnimatedSection from "../common/AnimatedSection";

declare global {
  interface Window {
    emailjs: any;
  }
}

const Contact: React.FC = () => {
  const [emailjsLoaded, setEmailjsLoaded] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Cargar EmailJS
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.async = true;
    script.onload = () => {
      window.emailjs.init("RZPeuWFNsCynZ2Zw3");
      setEmailjsLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: null, message: "" });
    }, 5000);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-slate-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notificación */}
        <NotificationToast notification={notification} />

        {/* Título */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contacto
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            ¿Tienes un proyecto en mente? Me encantaría escuchar sobre tus
            desafíos de datos y BI.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Columna Izquierda */}
          <AnimatedSection delay={0.2} direction="left" className="space-y-8">
            <ContactInfo />
            <SocialLinks />
          </AnimatedSection>

          {/* Columna Derecha */}
          <AnimatedSection delay={0.3} direction="right">
            <ContactForm
              emailjsLoaded={emailjsLoaded}
              showNotification={showNotification}
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
