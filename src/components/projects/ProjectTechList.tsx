interface ProjectTechListProps {
  technologies: string[];
}

const ProjectTechList: React.FC<ProjectTechListProps> = ({ technologies }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.5rem' }}>
    {technologies.map((tech, index) => (
      <span
        key={index}
        style={{
          padding: '0.2rem 0.6rem',
          backgroundColor: 'var(--fg-subtle)',
          color: 'var(--fg-muted)',
          borderRadius: '4px',
          fontSize: '0.7rem',
          fontWeight: 500,
          letterSpacing: '0.04em',
        }}
      >
        {tech}
      </span>
    ))}
  </div>
);

export default ProjectTechList;
