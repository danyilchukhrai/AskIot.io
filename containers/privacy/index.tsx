import PublicLayout from '@/components/PublicLayout';
import Link from 'next/link';
import { FC } from 'react';

interface IPrivacyProps {}

const Privacy: FC<IPrivacyProps> = (props) => {
  return (
    <PublicLayout>
      <section className="privacy-section md:py-15 py-8">
        <div className="container">
          <h3 className="text-2xl font-semibold md:pb-10 pb-5">Privacy Policy for askIoT.ai</h3>
          <p className="text-l font-medium pb-3">Introduction:</p>
          <p className="text-base">
            askIoT.ai, operated by [Your Company Name] ("Company", "we", "us", or "our"), provides
            IoT solutions and services via{' '}
            <Link className="text-primary-500 font-medium" href="https://askiot.ai/">
              https://askiot.ai/
            </Link>{' '}
            (referred to as "Service"). This Privacy Policy outlines our policies regarding the
            collection, use, and disclosure of personal data when you use our Service and the
            choices you have associated with that data.
          </p>
          <p className="text-l font-medium py-3">Definitions:</p>
          <div className="flex flex-col gap-1">
            <p className="text-base">
              <span className="font-medium">Service:</span> The{' '}
              <Link className="text-primary-500 font-medium" href="https://askiot.ai/">
                https://askiot.ai/
              </Link>{' '}
              website.
            </p>
            <p className="text-base">
              <span className="font-medium">Personal Data:</span> Data about a living individual who
              can be identified from those data.
            </p>
            <p className="text-base">
              <span className="font-medium">Usage Data:</span> Data collected automatically from the
              use of the Service or the Service infrastructure.
            </p>
            <p className="text-base">
              <span className="font-medium">Cookies:</span> Small files stored on your device.
            </p>
            <p className="text-base">
              <span className="font-medium">Data Controller:</span> Entity that determines the
              purposes and means of processing Personal Data.
            </p>
            <p className="text-base">
              <span className="font-medium">Data Processors (or Service Providers):</span> Any
              natural or legal person who processes the data on behalf of the Data Controller.
            </p>
            <p className="text-base">
              <span className="font-medium">Data Subject:</span> Any living individual who is the
              subject of Personal Data.
            </p>
            <p className="text-base">
              <span className="font-medium">User:</span> The individual using our Service,
              corresponding to the Data Subject.
            </p>
            <p className="text-base">
              <span className="font-medium">Information Collection and Use:</span> We collect
              various types of information for providing and improving our Service to you.
            </p>
          </div>
          <p className="text-l font-medium py-3">Types of Data Collected:</p>
          <div className="flex flex-col gap-1">
            <p className="text-base">
              <span className="font-medium">Personal Data:</span> While using our Service, we may
              ask you to provide us with certain personally identifiable information (e.g., email
              address, first name, last name).
            </p>
            <p className="text-base">
              <span className="font-medium">Usage Data:</span> This may include information such as
              your computer's IP address, browser type, browser version, the pages of our Service
              you visit, time and dates of your visits, and other diagnostic data.
            </p>
            <p className="text-base">
              <span className="font-medium">Tracking & Cookies Data:</span> We use cookies and
              similar tracking technologies to track activity on our Service.
            </p>
            <p className="text-base">
              <span className="font-medium">Tracking & Cookies Data:</span> We use cookies and
              similar tracking technologies to track activity on our Service.
            </p>
          </div>
          <p className="text-l font-medium py-3">Use of Data:</p>
          <p className="text-base pb-1">askIoT.ai uses the collected data for various purposes:</p>
          <ul className="flex flex-col gap-1 text-base list-disc pl-4">
            <li>
              To provide and maintain our Service. To notify you about changes to our Service.
            </li>
            <li>To allow interactive features of our Service when you choose to do so.</li>
            <li>To provide customer care and support.</li>
            <li>To provide analysis or valuable information for improving the Service.</li>
            <li>To monitor the usage of our Service.</li>{' '}
            <li>To detect, prevent, and address technical issues.</li>
          </ul>
          <p className="text-l font-medium py-3">Retention of Data:</p>
          <p className="text-base">
            We will retain your Personal Data only for as long as necessary for the purposes set out
            in this Privacy Policy.
          </p>
          <p className="text-l font-medium py-3">Transfer of Data:</p>
          <p className="text-base">
            Your information may be transferred to — and maintained on — computers located outside
            of your state, country, or other governmental jurisdiction.
          </p>
          <p className="text-l font-medium py-3">Disclosure of Data:</p>
          <p className="text-base">
            We may disclose your Personal Data if required to do so by law or in response to valid
            requests by public authorities.
          </p>
          <p className="text-l font-medium py-3">Security of Data:</p>
          <p className="text-base">
            We strive to use commercially acceptable means to protect your Personal Data but cannot
            guarantee its absolute security.
          </p>
          <p className="text-l font-medium py-3">Your Data Protection Rights:</p>
          <div className="flex flex-col gap-1">
            <p className="text-base">
              <span className="font-medium">GDPR Rights:</span> If you are a resident of the EU or
              EEA, you have certain data protection rights.
            </p>
            <p className="text-base">
              <span className="font-medium">Right to Access and Control Your Personal Data:</span>{' '}
              You have the right to request copies of your personal data, correct it, or delete it.
            </p>
            <p className="text-base">
              <span className="font-medium">Right to Object, Restrict, or Withdraw Consent:</span>{' '}
              ou have the right to object to our processing of your personal data, request that we
              restrict the processing of your data, or withdraw any consent you have given us.
            </p>
            <p className="text-base">
              <span className="font-medium">Service Providers:</span> We employ third-party
              companies and individuals to facilitate our Service (e.g., OpenAI, Stripe, PostgreSQL,
              Cloudflare, Postmark, Azure services, and Google Analytics).
            </p>
          </div>
          <p className="text-l font-medium py-3">Analytics:</p>
          <p className="text-base">
            <span className="font-medium">Google Analytics:</span> A web analytics service by Google
            that tracks and reports website traffic.
          </p>
          <p className="text-l font-medium py-3">Payments:</p>
          <p className="text-base">
            We use third-party services for payment processing (e.g., Stripe).
          </p>
          <p className="text-l font-medium py-3">Links to Other Sites:</p>
          <p className="text-base">
            Our Service may contain links to other sites not operated by us.
          </p>
          <p className="text-l font-medium py-3">Children's Privacy:</p>
          <p className="text-base">Our Service does not address anyone under the age of 18.</p>
          <p className="text-l font-medium py-3">Changes to This Privacy Policy:</p>
          <p className="text-base">We may update our Privacy Policy from time to time.</p>
          <p className="text-l font-medium py-3">Contact Us:</p>
          <p className="text-base">
            For any questions about this Privacy Policy, please contact us via email at [Your
            Contact Email].
          </p>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Privacy;
