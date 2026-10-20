import site from "@/content/site.json";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Services from "@/components/home/Services";
import Approach from "@/components/home/Approach";
import Paths from "@/components/home/Paths";
import Process from "@/components/home/Process";
import Audience from "@/components/home/Audience";
import Faq from "@/components/home/Faq";
import Contact from "@/components/home/Contact";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.brand.legalName,
  url: "https://brightarc.example",
  description: site.meta.description,
  email: site.contact.email,
  telephone: site.contact.phoneHref.replace("tel:", ""),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Marquee />
      <Services />
      <Approach />
      <Paths />
      <Process />
      <Audience />
      <Faq />
      <Contact />
    </>
  );
}
