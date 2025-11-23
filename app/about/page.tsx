export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:flex-row md:py-14">

        {/* MAIN CONTENT */}
        <section className="w-full md:w-2/3">

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            National Journalist Association
          </h1>

          <p className="mt-3 text-primary font-semibold tracking-wide text-sm uppercase">
            (Registered under Trust Act 1882 – Regd. No. 48/2020)
          </p>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            The <strong>National Journalist Association</strong> is a national-level 
            organization dedicated to safeguarding the rights, dignity, security, 
            and responsibilities of journalists, media professionals, and 
            social communicators across India.
          </p>

          <p className="mt-3 italic text-primary">
            “नैतिक पत्रकारिता ही सच्चे लोकतंत्र की नींव है”
          </p>

          <h2 className="mt-8 text-xl font-semibold">Who We Are</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The Association was founded by <strong>Rakesh Kumar Gupta</strong> 
            along with respected trustees, with a vision to strengthen journalism, 
            promote transparency, and ensure welfare and empowerment of media 
            professionals. An initial trust contribution of <strong>₹50,000</strong> 
            was provided by the Founder as a lifelong commitment toward building 
            a responsible institution.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Our Vision & Mission</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Our mission is to create an empowered, informed, and responsible media 
            community while working for the betterment of society. The trust 
            actively works for:
          </p>

          <ul className="mt-4 list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
            <li>Protecting journalists’ rights, safety, welfare, and professional dignity.</li>
            <li>Promoting ethical, unbiased, and public-interest journalism.</li>
            <li>Providing legal, financial, and humanitarian assistance to journalists in distress.</li>
            <li>Training programs in digital media, journalism skills, communication, and ethics.</li>
            <li>Social welfare activities for women, children, elderly, and disadvantaged communities.</li>
            <li>Programs focused on literacy, education, career development, and social empowerment.</li>
            <li>Campaigns against drug abuse, child marriage, dowry, caste discrimination, and exploitation.</li>
            <li>Environmental awareness, rural development, and self-employment initiatives.</li>
          </ul>

          <p className="mt-6 italic text-primary">
            “समाज में सुख-शांति, सद्भाव और विश्वास”
          </p>

          <h2 className="mt-8 text-xl font-semibold">Operational Area</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The operational jurisdiction of the trust covers <strong>all of India</strong>. 
            From urban media hubs to rural districts, the Association works to uplift 
            social, cultural, and journalistic values nationwide.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Trust Structure</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The trust is governed by a group of respected trustees representing 
            diverse fields including journalism, law, community service, and social work.
            They collectively guide policy, programs, and ethical standards of the 
            organization.
          </p>

          <h2 className="mt-8 text-xl font-semibold">Our Commitment</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            We are committed to defending freedom of expression, strengthening 
            public-interest journalism, and supporting journalists in challenging 
            circumstances. No journalist should ever feel alone in critical situations — 
            this is our assurance and responsibility.
          </p>

          <p className="mt-4 italic text-primary font-medium">
            “पत्रकारों की आवाज़ – राष्ट्र की आवाज़”
          </p>
        </section>

        {/* SIDEBAR */}
        <aside className="w-full md:w-1/3 space-y-8">

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-base font-semibold uppercase tracking-[0.18em] mb-4">
              Trust Snapshot
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><strong>Name:</strong> National Journalist Association</li>
              <li><strong>National Office</strong><br /><span>
                Sanjay Kumar, A28C Gali No-3,
                <br />
                AA Block Abhiyakti Bihar, Shiv Bihar,
                <br />
                Delhi – 110094
              </span></li>
              <li><strong>Jurisdiction:</strong> All India</li>
              <li><strong>Founder:</strong> Rakesh Kumar Gupta</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-base font-semibold uppercase tracking-[0.18em] mb-4">
              Key Trustees
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Rakesh Kumar Gupta – Founder & Lifetime Patron</li>
              <li>Neeraj Kumar Singh – Secretary</li>
              <li>Arvind Shosh – Treasurer</li>
              <li>Abhishek Kumar Srivastava – Trustee & Legal Advisor</li>
              <li>Dr. Ashok Kumar Mishra – Trustee</li>
              <li>Rana Pratap Singh – Trustee</li>
              <li>Deen Bandhu Singh – Trustee</li>
            </ul>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-base font-semibold uppercase tracking-[0.18em] mb-4">
              Focus Areas
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Journalist Welfare</li>
              <li>Media Ethics & Training</li>
              <li>Education & Digital Literacy</li>
              <li>Women & Child Empowerment</li>
              <li>Legal Aid & Social Justice</li>
              <li>Culture & Creative Development</li>
            </ul>
          </div>

        </aside>
      </div>
    </main>
  );
}
