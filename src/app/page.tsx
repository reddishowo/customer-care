export default function Home() {
    return (
      <div className="hero min-h-[60vh] bg-base-200 rounded-xl">
        <div className="hero-content text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to Customer Care
            </h1>
            <p className="py-6 text-xl text-base-content/80">
              How can we assist you today?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <a href="/faq" className="card bg-base-300 hover:bg-base-100 transition-all duration-300 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-primary justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    FAQs
                  </h2>
                  <p>Find quick answers to common questions</p>
                </div>
              </a>
              <a href="/contact" className="card bg-base-300 hover:bg-base-100 transition-all duration-300 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-primary justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Us
                  </h2>
                  <p>Get in touch with our support team</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  