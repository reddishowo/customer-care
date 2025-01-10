export default function FAQ() {
    const faqs = [
      {
        question: "What is Customer Care?",
        answer: "Customer Care is your dedicated support platform designed to provide quick and efficient assistance for all your needs.",
      },
      {
        question: "How do I contact support?",
        answer: "You can reach our support team through multiple channels: via our contact form, email, or live chat during business hours.",
      },
      {
        question: "What are your response times?",
        answer: "We aim to respond to all inquiries within 24 hours. Premium support members receive priority response within 4 hours.",
      },
    ];
  
    return (
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-base-content/80">
            Find quick answers to common questions
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-plus bg-base-200">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-base-content/80">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  