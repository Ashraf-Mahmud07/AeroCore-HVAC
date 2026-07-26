import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Corners } from '@/components/ui/Corners';
import { DuotoneImage } from '@/components/ui/DuotoneImage';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import buttonStyles from '@/components/ui/Button.module.css';
import { featuredPost, posts } from '@/lib/data';
import { cn } from '@/lib/utils';
import styles from './Blog.module.css';
import { Newsletter } from './Newsletter';

/** Field-notes index. Articles are not yet routed, so entries anchor the band. */
const BLOG_HREF = '/#blog';

export function Blog() {
  return (
    <Section id="blog" ariaLabelledBy="blog-heading">
      <Container>
        <Reveal className={styles.head}>
          <div className={styles.headCopy}>
            <SectionHeading
              id="blog-heading"
              kicker="10 — Field notes"
              title="The HVAC playbook."
            />
          </div>
          <ButtonLink href={BLOG_HREF} variant="secondary" className={buttonStyles.noWrap}>
            All articles
            <Icon name="arrow-right" size={16} />
          </ButtonLink>
        </Reveal>

        <div className={styles.stack}>
          <Reveal>
            <Link href={BLOG_HREF} className={cn('blueprint', styles.feature)}>
              <DuotoneImage
                image={featuredPost.image}
                mode="ratio"
                sizes="(max-width: 820px) 100vw, 60vw"
                className={styles.featureMedia}
              />
              <Corners />
              <div className={styles.featureBody}>
                <div className={styles.metaRow}>
                  <span className={cn('tag', 'tag-accent', styles.metaTag)}>
                    {featuredPost.cat}
                  </span>
                  <span className={styles.metaRead}>{featuredPost.read}</span>
                </div>
                <h3 className={styles.featureTitle}>{featuredPost.title}</h3>
                <p className={styles.featureExcerpt}>{featuredPost.excerpt}</p>
              </div>
            </Link>
          </Reveal>

          <div className={styles.posts}>
            {posts.map((post) => (
              <Reveal key={post.id}>
                <Link href={BLOG_HREF} className={cn('blueprint', styles.post)}>
                  <Corners />
                  <figure className={styles.postMedia}>
                    <DuotoneImage image={post.image} sizes="104px" />
                  </figure>
                  <div className={styles.postCopy}>
                    <div className={styles.postMeta}>
                      <span className={styles.postCat}>{post.cat}</span>
                      <span className={styles.postRead}>{post.read}</span>
                    </div>
                    <h3 className={styles.postTitle}>{post.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className={cn('blueprint', styles.newsletter)}>
            <Corners />
            <div className={styles.newsletterCopy}>
              <h3 className={styles.newsletterTitle}>Seasonal tune-up reminders, no spam.</h3>
              <p className={styles.newsletterBody}>
                One email at the turn of each season, with the checklist to keep your system under
                warranty.
              </p>
            </div>
            <Newsletter />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
