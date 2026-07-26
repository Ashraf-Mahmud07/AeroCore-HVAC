import { ButtonLink } from '@/components/ui/Button';
import { Corners } from '@/components/ui/Corners';
import { Counter } from '@/components/ui/Counter';
import { DuotoneImage } from '@/components/ui/DuotoneImage';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { homeImages, specRows } from '@/lib/data';
import { routes, siteConfig, telHref } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import styles from './Hero.module.css';

/** Spec-sheet hero: the capability datasheet beside a portrait plate. */
export function HeroSpec() {
  return (
    <div className={styles.spec}>
      <Reveal className={styles.specCopy}>
        <span className={styles.specKicker}>Sheet 01 — {siteConfig.name} capability</span>
        <h1 id="hero-heading" className={cn(styles.title, styles.specTitle)}>
          Read the system
          <br />
          before you buy it.
        </h1>
        <p className={cn(styles.lede, styles.specLede)}>
          Every proposal we hand you is a datasheet: load calculations, equipment specs, expected
          efficiency and a fixed price. No mystery line items, no upsell theatre.
        </p>

        <div className={cn('blueprint', styles.specTable)}>
          <Corners />
          <div className={styles.specTableHead}>
            <span className={styles.specTableTitle}>Standard performance data</span>
            <span className={styles.specTableRev}>Rev 26.7</span>
          </div>
          <table className="table">
            <caption className="ac-visually-hidden">
              AeroCore HVAC standard performance data, revision 26.7
            </caption>
            <tbody>
              {specRows.map((row) => (
                <tr key={row.no}>
                  <td className={styles.specNo}>{row.no}</td>
                  <td className={styles.specProp}>{row.prop}</td>
                  <td className={styles.specVal}>
                    <Counter
                      target={row.n}
                      suffix={row.suffix}
                      display={row.val}
                      className={styles.specValNumber}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={cn(styles.actions, styles.specActions)}>
          <ButtonLink href={routes.contact} variant="primary" size="cta">
            <Icon name="file-text" size={17} />
            Request a Spec Proposal
          </ButtonLink>
          <ButtonLink href={telHref} variant="secondary" size="cta">
            <Icon name="phone" size={17} />
            Call Now
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={140} className={styles.media}>
        <figure className={cn('blueprint', styles.specMedia)}>
          <DuotoneImage
            image={homeImages.heroSpec}
            priority
            sizes="(max-width: 820px) 100vw, 40vw"
          />
          <Corners />
        </figure>
      </Reveal>
    </div>
  );
}
