'use client';

import { useMemo, useState } from 'react';
import { Corners } from '@/components/ui/Corners';
import { DuotoneImage } from '@/components/ui/DuotoneImage';
import { Reveal } from '@/components/ui/Reveal';
import { projectFilters, projects } from '@/lib/data';
import { cn } from '@/lib/utils';
import type { ProjectFilter } from '@/types';
import styles from './Projects.module.css';

interface ProjectGalleryProps {
  /** Server-rendered section heading, slotted into the filter row. */
  readonly heading: React.ReactNode;
}

/**
 * Category filter and gallery. The filter row shares state with the grid, so
 * this is a client component; the heading is passed in already rendered.
 */
export function ProjectGallery({ heading }: ProjectGalleryProps) {
  const [filter, setFilter] = useState<ProjectFilter>('All');

  const visible = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((project) => project.type === filter || project.mode === filter),
    [filter],
  );

  return (
    <>
      <Reveal className={styles.head}>
        <div className={styles.headCopy}>{heading}</div>
        <div className={styles.filters} role="group" aria-label="Filter projects by category">
          {projectFilters.map((option) => {
            const active = filter === option;
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                className={cn(styles.filter, active && styles.filterActive)}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      </Reveal>

      <ul className={styles.grid} aria-live="polite">
        {visible.map((project) => (
          <li key={project.id}>
            <figure className={cn('blueprint', styles.card)}>
              <DuotoneImage
                image={project.image}
                mode="ratio"
                sizes="(max-width: 700px) 100vw, (max-width: 1280px) 50vw, 400px"
                className={styles.cardMedia}
              />
              <Corners color="var(--color-accent-300)" />
              <figcaption className={styles.caption}>
                <div className={styles.tags}>
                  <span className={cn('tag', styles.tagType)}>{project.type}</span>
                  <span className={cn('tag', styles.tagMode)}>{project.mode}</span>
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardBody}>{project.body}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}
