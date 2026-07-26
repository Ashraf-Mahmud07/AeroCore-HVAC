import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Corners } from '@/components/ui/Corners';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { planComparison } from '@/lib/data';
import { routes } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import styles from './MaintenancePage.module.css';

export function ComparisonTable() {
  return (
    <Section size="sm" tone="surface" border="both" ariaLabelledBy="compare-heading">
      <Container width={1080}>
        <Reveal className={styles.compareHead}>
          <SectionHeading
            id="compare-heading"
            kicker="Line by line"
            title="Compare every plan."
            size={50}
            align="center"
            rule={false}
          />
        </Reveal>

        <Reveal>
          <div className={cn('blueprint', styles.compareFrame)}>
            <Corners />
            <div className={styles.compareScroll}>
              <table className={cn('table', styles.compare)}>
                <caption className="ac-visually-hidden">
                  Feature comparison across the Essential, Comfort and Total Care plans
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className={styles.featureHead}>
                      Feature
                    </th>
                    <th scope="col" className={styles.planHead}>
                      Essential
                    </th>
                    <th scope="col" className={cn(styles.planHead, styles.planHeadFeatured)}>
                      Comfort
                    </th>
                    <th scope="col" className={styles.planHead}>
                      Total&nbsp;Care
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {planComparison.map((row) => (
                    <tr key={row.feature}>
                      <th scope="row" className={styles.featureCell}>
                        {row.feature}
                      </th>
                      <td className={styles.planCell}>{row.essential}</td>
                      <td className={cn(styles.planCell, styles.planCellFeatured)}>
                        {row.comfort}
                      </td>
                      <td className={styles.planCell}>{row.totalCare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        <div className={styles.compareActions}>
          <ButtonLink
            href={routes.contact}
            variant="secondary"
            block
            className={styles.compareAction}
          >
            Essential
          </ButtonLink>
          <ButtonLink
            href={routes.contact}
            variant="primary"
            block
            className={styles.compareAction}
          >
            Comfort
          </ButtonLink>
          <ButtonLink
            href={routes.contact}
            variant="secondary"
            block
            className={styles.compareAction}
          >
            Total Care
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
