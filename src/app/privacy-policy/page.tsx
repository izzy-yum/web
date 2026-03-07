export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-primary-50 px-4 pt-20 pb-12">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl shadow-lg p-8 md:p-12" style={{ backgroundColor: '#8d2831' }}>
          <h1 className="text-4xl font-heading font-bold text-white mb-6">
            Privacy Policy
          </h1>

          <p className="text-sm text-neutral-200 mb-8">
            Last updated: March 1, 2026
          </p>

          <div className="space-y-6 text-neutral-100">
            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Our Commitment
              </h2>
              <p className="text-lg leading-relaxed text-neutral-50">
                We respect your privacy. <strong>We do not sell, rent, or share your personal data with third parties.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                What Information We Collect
              </h2>
              <p className="leading-relaxed mb-3">
                We collect minimal information necessary to provide our service:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Email address:</strong> Used to verify you are a real person and to send you account-related notifications.
                </li>
                <li>
                  <strong>Phone number:</strong> Used exclusively to send your shopping lists to your mobile device via push notifications.
                </li>
                <li>
                  <strong>Recipe preferences:</strong> Information about recipes you view and shopping lists you create to improve your experience.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To provide and maintain our recipe planning service</li>
                <li>To send verification codes during registration</li>
                <li>To send shopping lists to your phone when you request them</li>
                <li>To improve our service and user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                SMS Communications
              </h2>
              <p className="leading-relaxed mb-3">
                When you create an account, you will receive SMS text messages containing verification codes
                to confirm your phone number. By providing your phone number during registration and checking
                the consent box, you agree to receive these verification messages.
              </p>
              <p className="leading-relaxed mb-3">
                Standard message and data rates may apply. We use Twilio to deliver SMS messages, and your
                phone number is only used for sending verification codes and optional shopping list notifications.
              </p>
              <p className="leading-relaxed">
                You can opt-out of SMS communications at any time by contacting us at support@izzy-yum.com,
                though this may limit certain account functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                What We DON'T Do
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>We do NOT sell your data</strong> to advertisers or third parties</li>
                <li><strong>We do NOT share your email or phone</strong> with anyone</li>
                <li><strong>We do NOT send marketing messages</strong> or spam</li>
                <li><strong>We do NOT track you</strong> across other websites</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Third-Party Services
              </h2>
              <p className="leading-relaxed mb-3">
                To provide our service, we use these trusted third-party providers:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Supabase:</strong> Database and authentication services. Your data is stored securely in their cloud infrastructure.
                </li>
                <li>
                  <strong>Twilio:</strong> SMS delivery service for phone verification codes and shopping list notifications. They process your phone number only for message delivery.
                </li>
                <li>
                  <strong>Vercel:</strong> Web hosting service. They process basic web traffic data for service delivery.
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                These services are bound by their own privacy policies and security standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Data Security
              </h2>
              <p className="leading-relaxed">
                We implement industry-standard security measures to protect your information. Your password is encrypted,
                and your data is stored securely. However, no method of transmission over the internet is 100% secure,
                and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Your Rights
              </h2>
              <p className="leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Export your data</li>
              </ul>
              <p className="leading-relaxed mt-3">
                To exercise these rights, contact us at privacy@izzy-yum.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-white mb-3">
                Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-3">
                <strong>Email:</strong> privacy@izzy-yum.com
              </p>
            </section>

            <section className="pt-6 mt-6 border-t border-neutral-400">
              <p className="text-sm text-neutral-200">
                This privacy policy may be updated from time to time. We will notify you of any changes by
                posting the new policy on this page and updating the "Last updated" date.
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
