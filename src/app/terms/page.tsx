export default function TermsPage() {
  return (
    <div className="min-h-screen bg-primary-50 px-4 pt-20 pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl shadow-lg p-8 md:p-12" style={{ backgroundColor: '#8d2831' }}>
          <h1 className="text-4xl font-heading font-bold text-white mb-6">
            Terms and Conditions
          </h1>

          <p className="text-sm text-neutral-200 mb-8">
            Last updated: March 1, 2026
          </p>

          <div className="space-y-6 text-neutral-100">
            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Welcome to Izzy Yum
              </h2>
              <p className="text-lg leading-relaxed text-neutral-50">
                By using Izzy Yum, you agree to these simple terms. We've kept them straightforward and easy to understand.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Use of Service
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Izzy Yum is a free recipe planning and shopping list service for people with celiac disease</li>
                <li>You must be 13 years or older to use this service</li>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You agree to provide accurate information when registering</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Recipe Information
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All recipes are provided for informational purposes</li>
                <li>While we strive to provide gluten-free recipes, <strong>always verify ingredients yourself</strong></li>
                <li>We are not responsible for adverse reactions or health issues</li>
                <li>If you have celiac disease or severe allergies, consult ingredient labels and your doctor</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Your Content
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Shopping lists and preferences you create remain yours</li>
                <li>We use this data only to provide the service to you</li>
                <li>We do not claim ownership of your personal data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                What We Don't Allow
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Using the service for illegal purposes</li>
                <li>Attempting to hack or disrupt the service</li>
                <li>Scraping or automated data collection</li>
                <li>Sharing your account credentials with others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Service Availability
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We provide the service "as is" without warranties</li>
                <li>We may modify or discontinue features at any time</li>
                <li>We are not liable for service interruptions or data loss</li>
                <li>We recommend keeping your own copies of important recipes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Free Service
              </h2>
              <p className="leading-relaxed">
                Izzy Yum is currently free to use. We reserve the right to introduce paid features in the future,
                but core functionality will remain free. We'll notify users before any major changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Termination
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You may delete your account at any time</li>
                <li>We may suspend or terminate accounts that violate these terms</li>
                <li>Upon termination, your data will be deleted according to our Privacy Policy</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Changes to Terms
              </h2>
              <p className="leading-relaxed">
                We may update these terms from time to time. We'll notify you of significant changes via email.
                Continued use of the service after changes means you accept the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Contact
              </h2>
              <p className="leading-relaxed">
                Questions about these terms? Contact us at: <strong>support@izzy-yum.com</strong>
              </p>
            </section>

            <section className="pt-6 mt-6 border-t border-neutral-400">
              <p className="text-sm text-neutral-200">
                By using Izzy Yum, you acknowledge that you have read and agree to these Terms and Conditions.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-400">
            <a
              href="/"
              className="inline-flex items-center text-primary-100 hover:text-white font-medium transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
