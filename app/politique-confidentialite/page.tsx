import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Politique de confidentialité — SARL Bohème Lucas",
  description:
    "Politique de confidentialité et protection des données personnelles de la SARL Bohème Lucas, artisan charpentier-couvreur à Champagney (70).",
  robots: { index: false, follow: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHero
        title="Politique de confidentialité"
        subtitle="Protection de vos données personnelles — SARL Bohème Lucas"
        breadcrumbs={[{ label: "Accueil", href: "/" }, { label: "Politique de confidentialité" }]}
        bgImage="/galerie/bardage-05.jpg"
      />

      <section className="section-padding bg-background">
        <div className="container-max max-w-3xl mx-auto prose prose-slate">

          <h2>1. Responsable du traitement</h2>
          <p>
            <strong>SARL Bohème Lucas</strong><br />
            Siège social : Champagney, 70290 Haute-Saône<br />
            SIRET : 917 779 068 00019<br />
            Email : <a href="mailto:bohemelucas7@gmail.com">bohemelucas7@gmail.com</a><br />
            Téléphone : <a href="tel:0751697176">07 51 69 71 76</a>
          </p>

          <h2>2. Données collectées</h2>
          <p>
            Dans le cadre de l&rsquo;utilisation du formulaire de contact présent sur ce site, nous collectons
            les informations suivantes :
          </p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Commune</li>
            <li>Nature du service souhaité</li>
            <li>Message libre décrivant votre projet</li>
          </ul>
          <p>
            Ce site ne dépose aucun cookie de traçage ni cookie analytique. Aucune donnée n&rsquo;est
            collectée automatiquement au-delà des informations que vous renseignez volontairement dans
            le formulaire de contact.
          </p>

          <h2>3. Finalité du traitement</h2>
          <p>
            Les données collectées via le formulaire de contact sont utilisées exclusivement pour :
          </p>
          <ul>
            <li>Répondre à votre demande de devis ou à votre question</li>
            <li>Vous recontacter dans le cadre de votre projet de charpente, couverture ou travaux connexes</li>
          </ul>
          <p>Elles ne sont en aucun cas transmises à des tiers à des fins commerciales.</p>

          <h2>4. Base légale</h2>
          <p>
            Le traitement de vos données repose sur votre consentement (Article 6.1.a du RGPD), que
            vous exprimez en remplissant et en soumettant le formulaire de contact.
          </p>

          <h2>5. Durée de conservation</h2>
          <p>
            Vos données sont conservées le temps nécessaire au traitement de votre demande, et au
            maximum 3 ans à compter du dernier contact, conformément aux recommandations de la CNIL.
          </p>

          <h2>6. Destinataires des données</h2>
          <p>
            Les données collectées via le formulaire sont transmises par email à la SARL Bohème Lucas
            via le service <strong>Resend</strong> (prestataire d&rsquo;envoi d&rsquo;emails transactionnels),
            dont la politique de confidentialité est accessible sur{" "}
            <a href="https://resend.com/privacy-policy" target="_blank" rel="noopener noreferrer">
              resend.com
            </a>
            .
          </p>

          <h2>7. Vos droits</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
            Informatique et Libertés, vous disposez des droits suivants sur vos données personnelles :
          </p>
          <ul>
            <li><strong>Droit d&rsquo;accès</strong> : obtenir une copie des données vous concernant</li>
            <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
            <li><strong>Droit à l&rsquo;effacement</strong> : demander la suppression de vos données</li>
            <li><strong>Droit d&rsquo;opposition</strong> : vous opposer au traitement de vos données</li>
            <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous par email à{" "}
            <a href="mailto:bohemelucas7@gmail.com">bohemelucas7@gmail.com</a> en précisant votre
            demande. Nous nous engageons à y répondre dans un délai d&rsquo;un mois.
          </p>
          <p>
            Vous avez également le droit d&rsquo;introduire une réclamation auprès de la{" "}
            <strong>CNIL</strong> (Commission Nationale de l&rsquo;Informatique et des Libertés) sur{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
              www.cnil.fr
            </a>
            .
          </p>

          <h2>8. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
            protéger vos données contre tout accès non autorisé, perte ou divulgation. Les échanges
            de données entre votre navigateur et ce site sont sécurisés par protocole HTTPS.
          </p>

          <h2>9. Cookies</h2>
          <p>
            Ce site n&rsquo;utilise pas de cookies de traçage, de cookies analytiques ni de cookies
            publicitaires. Aucun bandeau de consentement aux cookies n&rsquo;est donc requis.
          </p>

          <h2>10. Modifications</h2>
          <p>
            La présente politique de confidentialité peut être mise à jour à tout moment. La date de
            dernière mise à jour est indiquée ci-dessous.
          </p>
          <p className="text-sm text-gray-500">Dernière mise à jour : juin 2025</p>

        </div>
      </section>
    </>
  );
}
