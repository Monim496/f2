import { Fragment } from "react";

import styles from "./PrivacyPolicy.module.css";
import Head from "next/head";

function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Lost Nest</title>
        <meta
          name="description"
          content="Lost and Found Hub for University Students"
        />
        <link rel="icon" href="/images/LostNestLogo.svg" />
      </Head>

      <div className={styles.privacyPolicy}>
        <h1>LostNest Privacy Policy</h1>
        <p>
          This document outlines the Privacy Policy for LostNest, the web
          application developed by us. By using LostNest, you agree to the terms
          outlined in this Privacy Policy.
        </p>

        <h2>Information Collection and Use</h2>
        <h3>
          How the Application Accesses, Uses, Stores, or Shares Google User Data
        </h3>
        <p>
          <strong>Access:</strong> User data is accessed only when users choose
          to log in via Google OAuth.
        </p>
        <p>
          We utilize the useSession() hook provided by Next.js to access the
          current logged-in user's session.
        </p>
        <p>
          The session object obtained contains only three pieces of information:
          the user's Google account username, Gmail ID, and profile picture.
        </p>
        <p>
          <strong>Limited Data:</strong> LostNest strictly limits the data
          accessed to these three pieces of information; no additional data is
          retrieved.
        </p>
        <p>
          <strong>Storage:</strong> LostNest does not store any user data from
          Google accounts.
        </p>
        <p>
          <strong>Usage:</strong> The accessed data is solely used for
          displaying the user's profile information within LostNest's interface.
        </p>
        <p>
          <strong>No Sharing:</strong> Google user data is neither shared nor
          stored by LostNest beyond the user's interaction with the platform.
        </p>

        <h2>Data Security</h2>
        <p>
          We take reasonable measures to protect your personal information from
          unauthorized access, disclosure, alteration, or destruction. Your
          privacy and security are of utmost importance to us, and we ensure
          that user data is not disclosed to any third parties.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          LostNest uses Google OAuth for user authentication. When you log in to
          LostNest using your Google account, you are subject to Google's
          Privacy Policy. We encourage you to review Google's Privacy Policy to
          understand how your information is handled by Google.
        </p>

        <h2>Changes to this Privacy Policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We will notify you of any changes by posting the new Privacy
          Policy on this page. You are advised to review this Privacy Policy
          periodically for any updates.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or the practices
          of LostNest, please contact us at
          <a
            href="mailto:gcch1122@gmail.com"
            style={{ textDecoration: "underline" }}
          >
            gcch1122@gmail.com
          </a>
          .
        </p>
      </div>
    </Fragment>
  );
}

export default HomePage;
